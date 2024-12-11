import Link from 'next/link';
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import Icon, { IconName } from '@/components/icon/Icon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ROUTES, { RoutesUser } from '@/utils/constants/routes';

interface Props extends DropdownMenuContentProps {
  itemsSetting: {
    title: string;
    items: {
      key: number;
      group: {
        key: string;
        title: string;
        icon: string;
        disable: boolean;
      }[];
    }[];
  };
}

export function DropdownSettingsUser({ itemsSetting, ...props }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='font-medium'>
          {itemsSetting.title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' side='bottom' {...props}>
        {itemsSetting.items.map(({ key, group }) => (
          <>
            <DropdownMenuGroup key={key}>
              {group.map((menuItem) => (
                <DropdownMenuItem key={menuItem.key} disabled={menuItem.disable}>
                  {menuItem.icon && <Icon name={menuItem.icon as IconName} />}
                  {menuItem.disable ? (
                    menuItem.title
                  ) : (
                    <Link href={ROUTES.USER[menuItem.key as RoutesUser]}>{menuItem.title}</Link>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        ))}
        <DropdownMenuItem>
          <Icon name='LogOut' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
