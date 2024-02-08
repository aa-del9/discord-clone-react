import { useParams } from "react-router-dom";

const ServerIdLayout = () => {
  const params = useParams();
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col inset-y-0">
        Server Sidebar
      </div>
      <main className="h-full md:pl-60"> server {params?.serverId}</main>
    </div>
  );
};

export default ServerIdLayout;
