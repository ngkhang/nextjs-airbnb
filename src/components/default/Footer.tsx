import Icon, { IconName } from '@/components/icon/Icons';
import { Separator } from '@/components/ui/separator';
import { defaultContent } from '@/lib/staticContent';
import { cn } from '@/lib/utils';

const { Footer } = defaultContent.commonContent;

const FooterDefault = () => (
  <div>
    {/* Main Footer */}
    <div className='grid lg:grid-cols-3 lg:gap-2'>
      {Footer.main.map(({ title, key, items }) => (
        <div key={key} className='text-sm'>
          <div className='py-6 text-sm xl:py-12'>
            <h3 className='mb-3 font-bold'>{title}</h3>
            <ul className='grid gap-2'>
              {items.map((item) => (
                <li key={item.key} className='cursor-pointer hover:underline'>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
          <Separator className='h-[2px] lg:hidden' />
        </div>
      ))}
    </div>

    <Separator className='hidden h-[2px] flex-col md:center lg:block' />

    {/* Sub Footer */}
    <div className='py-6'>
      <div className='flex-col items-center justify-between text-sm md:flex xl:flex-row'>
        <div className='mb-4 items-center md:flex xl:order-2 xl:m-0'>
          <div className='mr-10 flex font-bold'>
            <div className='mr-3 flex cursor-pointer items-center'>
              <Icon className='mr-1' name='Global' />
              <span className='hover:underline'>English (US)</span>
            </div>
            <div className='flex cursor-pointer items-center'>
              <Icon className='mr-1' name='Vnd' />
              <span className='hover:underline'>VND</span>
            </div>
          </div>
          <div className='hidden items-center md:flex'>
            {Footer.sub.social.map((item) => (
              <Icon
                className='ml-2 size-6 cursor-pointer hover:underline'
                name={item.icon as IconName}
                key={item.key}
              />
            ))}
          </div>
        </div>
        <div className='flex-col flex-wrap items-center lg:flex xl:order-1 xl:flex-row'>
          <p>&copy; {Footer.sub.copyright}</p>
          <ul className='flex flex-wrap'>
            {Footer.sub.others.map((item) => (
              <div key={item.key} className='flex items-center'>
                <span className={cn('px-2 py-1 text-lg', item.key === 0 && 'hidden xl:block')}>·</span>
                <li className='cursor-pointer hover:underline'>{item.title}</li>
                <div className={cn(Footer.sub.others.length - 1 !== item.key && 'hidden', 'ml-2')}>
                  <Icon name='Privacy' />
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default FooterDefault;
