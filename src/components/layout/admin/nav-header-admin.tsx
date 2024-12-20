import Link from 'next/link';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ROUTES from '@/utils/constants/routes';

interface NavHeaderAdminProps {
  item: {
    title: string;
    id: string;
    description: string;
    avatar: string;
  };
}

export default function NavHeaderAdmin({ item }: NavHeaderAdminProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href={ROUTES.ADMIN[item.id as keyof typeof ROUTES.ADMIN]}>
          <SidebarMenuButton
            size='lg'
            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
          >
            <Avatar className='h-8 w-8 rounded-lg'>
              <AvatarImage src={item.avatar} alt={item.title} />
              <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>{item.title}</span>
              <span className='truncate text-xs'>{item.description}</span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
