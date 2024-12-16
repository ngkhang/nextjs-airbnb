import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { defaultContent } from '@/lib/staticContent';
import Icon, { IconName } from '@/components/icon/Icon';

const { dashboard, shared } = defaultContent.userContent;

export default function DashboardPage() {
  return (
    <div>
      <div className='grid gap-8'>
        {/* Title section */}
        <div className='hidden lg:block'>
          <h2 className='text-3xl font-semibold'>{`${dashboard.title} name`}</h2>
        </div>

        {/* Shared Info section */}
        <ul className='grid gap-4 xl:grid-cols-2'>
          {dashboard.publicInfo.ask.map((ask) => (
            <li key={ask.key} className='flex items-center gap-3'>
              <Icon name={ask.icon as IconName} size={24} />
              <span className='flex-1 text-base'>{`${ask.title}: ${ask.description}`}</span>
            </li>
          ))}
        </ul>

        {/* About section */}
        <p className='whitespace-pre-line'>{dashboard.publicInfo.about}</p>
      </div>

      <Separator className='my-10' />

      {/* Verify account */}
      <div>
        <h3 className='mb-5 text-xl font-semibold'>{`Khang's ${shared.confirmed.title}`}</h3>

        <ul className='grid gap-3'>
          {shared.confirmed.items.map(({ key, title }) => (
            <li key={key} className='flex items-center gap-3'>
              {/* NOTE: Verify check */}
              <Icon name='Check' />
              <span className='flex-1'>{title}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className='lg:hidden'>
        <Separator className='my-10' />
        <div className='flex items-center'>
          <Icon name='Flag' size={20} className='mr-2 fill-black' />
          <Link className='font-medium underline' href={shared.report.url}>
            {shared.report.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
