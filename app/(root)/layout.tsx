import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { checkSubscription } from "@/lib/subscription";
import { getApiLimitCount } from "@/lib/api-limit";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const RootLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  /*
  return ( 
    <div className="h-full">
      <Navbar isPro={isPro} apiLimitCount={apiLimitCount} />
      <div className="hidden md:flex mt-16 h-full w-20 flex-col fixed inset-y-0">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
      </div>
      <main className="md:pl-20 pt-16 h-full">
        {children}
      </main>
    </div>
   );
  */
   return ( 
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
      </div>
      <main className="md:pl-[72px] h-full">
        {children}
      </main>
    </div>
   );
}
 
export default RootLayout;