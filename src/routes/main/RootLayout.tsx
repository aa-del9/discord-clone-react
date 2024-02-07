// import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const RootLayout = () => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        {/* <NavigationSidebar /> */}
      </div>
      <main className="md:pl-[72px] h-full"></main>
    </div>
  );
};

export default RootLayout;
