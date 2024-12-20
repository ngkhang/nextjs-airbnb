'use client';

import Link from 'next/link';
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';
import Icon, { IconName } from '@/components/icon/Icon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ROUTES, { RoutesUser } from '@/utils/constants/routes';
import { User } from '@/types/user.type';
import authService from '@/services/auth.service';

interface ItemMenu {
  icon: string;
  id: string;
  title: string;
}
interface GroupMenu extends ItemMenu {
  key: number;
  disable: boolean;
}

interface Props extends DropdownMenuContentProps {
  itemsSetting: {
    title: string;
    top: ItemMenu;
    middle: {
      key: number;
      group: GroupMenu[];
    }[];
    bottom: ItemMenu;
  };
  user: User;
}

export function DropdownSettingsUser({ itemsSetting, user, ...props }: Props) {
  const router = useRouter();
  const handleLogout = async () => {
    await authService.logout();
    router.push(ROUTES.HOME.ROOT, { scroll: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='font-medium text-[#008489]'>
          {itemsSetting.title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 p-3' side='bottom' {...props}>
        <DropdownMenuLabel>
          <Link
            className='flex items-center gap-2 py-1'
            href={`${ROUTES.USER[itemsSetting.top.id as RoutesUser]}/${user.id}` || '/'}
          >
            <Icon size={18} name={itemsSetting.top.icon as IconName} />
            <span className='flex-1'>{itemsSetting.top.title}</span>
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {itemsSetting.middle.map(({ key, group }) => (
          <>
            <DropdownMenuGroup key={key}>
              {group.map((menuItem) => (
                <DropdownMenuItem className='focus:text-inherit' key={menuItem.key} disabled={menuItem.disable}>
                  <Link
                    className='flex w-full items-center gap-2 py-1'
                    href={ROUTES.USER[menuItem.id as RoutesUser] || '/'}
                  >
                    {menuItem.icon && <Icon size={18} name={menuItem.icon as IconName} />}
                    <span className='flex-1'>{menuItem.title}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        ))}
        <DropdownMenuItem onClick={handleLogout} className='flex cursor-pointer items-center gap-2 py-2'>
          <Icon size={18} name={itemsSetting.bottom.icon as IconName} />
          <span className='flex-1'>{itemsSetting.bottom.title}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
