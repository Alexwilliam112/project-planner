'use client'

import { Button } from '@/components/ui/button'
import { navItems } from '@/config/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const title = navItems.find((t) => t.href === pathname)?.title || ''

  return (
    <header className="flex flex-col gap-4 w-full h-full items-center border-b pb-3">
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 justify-center w-full">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button className="w-full" variant={pathname === item.href ? 'default' : 'ghost'}>
              {item.icon} {item.title}
            </Button>
          </Link>
        ))}
      </div>
    </header>
  )
}
