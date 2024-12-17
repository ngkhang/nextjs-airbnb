import UserHeader from '@/components/layout/user/user-header/UserHeader';
import FooterDefault from '@/components/default/Footer';

interface Props {
  children: React.ReactNode;
}

export default async function UserLayout({ children }: Props) {
  return (
    <section className='relative flex min-h-screen flex-col gap-4 pt-20 lg:pt-24'>
      {/* User Header */}
      <div className='container fixed left-0 top-0 z-40 w-full bg-white shadow-lg'>
        <UserHeader hasSearchForm={false} isShowLogo={true} />
      </div>

      {/* Main User Layout */}
      <main className='container flex-grow py-10 pt-6'>
        <section className='mx-auto max-w-[380px] lg:max-w-[1162px]'>{children}</section>
      </main>

      {/* Footer section */}
      <footer className='container hidden grid-cols-6 gap-6 self-end bg-[#F7F7F7] md:block 4xl:grid'>
        <div className='col-span-4 col-start-2'>
          <FooterDefault />
        </div>
      </footer>
    </section>
  );
}
