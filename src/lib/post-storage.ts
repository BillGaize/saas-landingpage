import fs from 'fs'
import path from 'path'
import {
  getPostFilePath,
  serializePost,
  type Post
} from '@/lib/posts'

interface GithubFile {
  sha: string
}

function getRepoConfig() {
  return {
    token: process.env.GITHUB_TOKEN,
    owner: process.env.GITHUB_OWNER ?? 'billadriang',
    repo: process.env.GITHUB_REPO ?? 'saas-landingpage',
    branch: process.env.GITHUB_BRANCH ?? 'main'
  }
}

function getContentPath(slug: string) {
  return `content/posts/${slug}.json`
}

function encodeContent(content: string) {
  return Buffer.from(content).toString('base64')
}

async function githubRequest(
  pathname: string,
  init?: RequestInit
) {
  const { token } = getRepoConfig()

  if (!token) {
    throw new Error('Missing GITHUB_TOKEN')
  }

  return await fetch(`https://api.github.com${pathname}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init?.headers ?? {})
    },
    cache: 'no-store'
  })
}

async function getGithubFile(pathname: string) {
  const { owner, repo, branch } = getRepoConfig()
  const response = await githubRequest(
    `/repos/${owner}/${repo}/contents/${pathname}?ref=${branch}`
  )

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(
      `GitHub read failed: ${response.status}`
    )
  }

  return (await response.json()) as GithubFile
}

async function putGithubFile(
  pathname: string,
  content: string,
  message: string,
  sha?: string
) {
  const { owner, repo, branch } = getRepoConfig()
  const response = await githubRequest(
    `/repos/${owner}/${repo}/contents/${pathname}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        message,
        content: encodeContent(content),
        branch,
        sha
      })
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `GitHub write failed: ${response.status} ${errorText}`
    )
  }
}

async function deleteGithubFile(
  pathname: string,
  message: string,
  sha: string
) {
  const { owner, repo, branch } = getRepoConfig()
  const response = await githubRequest(
    `/repos/${owner}/${repo}/contents/${pathname}`,
    {
      method: 'DELETE',
      body: JSON.stringify({
        message,
        sha,
        branch
      })
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `GitHub delete failed: ${response.status} ${errorText}`
    )
  }
}

function writeLocalPost(post: Post) {
  const filePath = getPostFilePath(post.slug)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, serializePost(post), 'utf8')
}

function deleteLocalPost(slug: string) {
  const filePath = getPostFilePath(slug)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

export async function savePost(
  originalSlug: string | null,
  post: Post
) {
  const repoConfig = getRepoConfig()

  if (!repoConfig.token) {
    if (process.env.VERCEL) {
      throw new Error(
        'Missing GITHUB_TOKEN in production. Add it to your hosting environment before using the admin.'
      )
    }

    if (originalSlug && originalSlug !== post.slug) {
      deleteLocalPost(originalSlug)
    }
    writeLocalPost(post)
    return {
      mode: 'local' as const
    }
  }

  const targetPath = getContentPath(post.slug)
  const existingTarget = await getGithubFile(targetPath)

  await putGithubFile(
    targetPath,
    serializePost(post),
    `Save post ${post.slug}`,
    existingTarget?.sha
  )

  if (originalSlug && originalSlug !== post.slug) {
    const oldPath = getContentPath(originalSlug)
    const existingOld = await getGithubFile(oldPath)
    if (existingOld?.sha) {
      await deleteGithubFile(
        oldPath,
        `Delete renamed post ${originalSlug}`,
        existingOld.sha
      )
    }
  }

  return {
    mode: 'github' as const
  }
}

export async function removePost(slug: string) {
  const repoConfig = getRepoConfig()

  if (!repoConfig.token) {
    if (process.env.VERCEL) {
      throw new Error(
        'Missing GITHUB_TOKEN in production. Add it to your hosting environment before using the admin.'
      )
    }

    deleteLocalPost(slug)
    return {
      mode: 'local' as const
    }
  }

  const pathname = getContentPath(slug)
  const existingFile = await getGithubFile(pathname)

  if (!existingFile?.sha) {
    throw new Error('Post not found')
  }

  await deleteGithubFile(
    pathname,
    `Delete post ${slug}`,
    existingFile.sha
  )

  return {
    mode: 'github' as const
  }
}
