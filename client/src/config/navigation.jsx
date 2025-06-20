'use client'

import { LayoutGridIcon } from 'lucide-react'
import { NotebookPen } from 'lucide-react'
import { LaptopMinimalCheck } from 'lucide-react'
import { Calendar } from 'lucide-react'
import { Milestone } from 'lucide-react'
import { FolderCodeIcon } from 'lucide-react'

export const navItems = [
  {
    title: 'Projects',
    href: '/projects',
    icon: <FolderCodeIcon />,
  },
  {
    title: 'Gantt Chart',
    href: '/gantt-chart',
    icon: <Milestone />,
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutGridIcon />,
  },
  {
    title: 'Calendar',
    href: '/calendar',
    icon: <Calendar />,
  },
  {
    title: 'Capacity Plan',
    href: '/capacity-plan',
    icon: <NotebookPen />,
  },
  {
    title: 'Capacity Estimation',
    href: '/task-summary',
    icon: <LaptopMinimalCheck />,
  },
]
