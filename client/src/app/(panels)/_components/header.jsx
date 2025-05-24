'use client'

import { Button } from '@/components/ui/button'
import { navItems } from '@/config/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const title = navItems.find((t) => t.href === pathname)?.title || ''

  return (
    <header className="flex flex-col gap-4 w-full h-full items-center">
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div className="flex gap-2 flex-wrap justify-center">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button variant={pathname === item.href ? 'default' : 'outline'}>
              {item.icon} {item.title}
            </Button>
          </Link>
        ))}
      </div>
    </header>
  )
}
