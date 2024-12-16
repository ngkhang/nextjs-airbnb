import Link from 'next/link';
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
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
}

export function DropdownSettingsUser({ itemsSetting, ...props }: Props) {
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
            href={ROUTES.USER[itemsSetting.top.id as RoutesUser] + '123' || '/'}
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
                  <Link className='flex items-center gap-2 py-1' href={ROUTES.USER[menuItem.id as RoutesUser] || '/'}>
                    {menuItem.icon && <Icon size={18} name={menuItem.icon as IconName} />}
                    <span className='flex-1'>{menuItem.title}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        ))}
        <DropdownMenuItem>
          <Link
            className='flex items-center gap-2 py-1'
            href={ROUTES.USER[itemsSetting.bottom.id as RoutesUser] || '/'}
          >
            <Icon size={18} name={itemsSetting.bottom.icon as IconName} />
            <span className='flex-1'>{itemsSetting.bottom.title}</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
