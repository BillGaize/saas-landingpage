import Link from 'next/link'
import Image from 'next/image'
import Typography from '@components/ui/typography'

export function Footer() {
  return (
    <footer className="flex h-12 items-center justify-center w-full border-t">
      <div className="w-full max-w-[1280px] md:px-8 px-4 flex place-content-center">
        <div className="gap-x-11 md:flex flex-1 hidden">
          <Link
            href="/"
            className="pointer flex items-center"
          >
            <Image
              src="/logo.svg"
              alt="Bill Gaize Dev logo"
              className="mr-3"
              width={24}
              height={24}
            />
            <Typography className="!text-white !text-base font-medium ">
              Bill Gaize Dev
            </Typography>
          </Link>
        </div>
        <div className="flex max-w-fit items-center gap-x-4">
          <Link
            href="/insights"
            className="pointer block w-fit flex-1"
          >
            <Typography variant="p" className="w-max">
              Blog
            </Typography>
          </Link>
          <Link
            href="https://calendly.com/me--52uo/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer block w-fit flex-1"
          >
            <Typography variant="p" className="w-max">
              Agendar llamada
            </Typography>
          </Link>
          <Link
            href="/terms-of-service"
            className="pointer block w-fit flex-1"
          >
            <Typography variant="p" className="w-max">
              Terminos de servicio
            </Typography>
          </Link>
          <Link
            href="/privacy-policy"
            className="pointer block w-fit"
          >
            <Typography variant="p">
              Politica de privacidad
            </Typography>
          </Link>
        </div>
      </div>
    </footer>
  )
}
