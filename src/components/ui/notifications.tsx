import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from './loading-spinner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
const Notifications = () => {
  // DUMMY
  const { data: notification, isLoading } =
    api.notification.getAllNotifications.useQuery();

  if (isLoading) {
    return <LoadingSpinnerCustom />;
  }

  let notifications = notification;
  if (!notifications) {
    notifications = [];
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-lg border-2 border-blue-600 bg-turquoise-100 p-1 shadow-green-sm">
          <Image
            src="/icons/notification-icon.svg"
            alt="Notification"
            width={24}
            height={24}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[70vw] max-w-[300px] bg-transparent shadow-blue-sm md:w-[300px]"
        side="bottom"
        sideOffset={1}
        align="end"
      >
        {/* Mini triangle tip */}
        <div className="flex justify-end bg-transparent pr-[4px]">
          <div className="h-0 w-0 border-b-[14px] border-l-[15px] border-r-[15px] border-b-turquoise-100 border-l-transparent border-r-transparent" />
        </div>
        <DropdownMenuGroup className="max-h-[40vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <DropdownMenuItem className={`rounded-t-sm bg-turquoise-100`}>
              <div className="p-4 text-center">Tidak ada Notifikasi</div>
            </DropdownMenuItem>
          ) : (
            notifications.map((notification, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className={`bg-turquoise-100 ${index === 0 ? 'rounded-t-sm' : ''}`}
                >
                  <div className="flex flex-row gap-3">
                    {/* Indicator */}
                    {/* <div>
                      <div
                        className={`my-[8px] w-[8px] h-[8px] rounded-full ${notification.isRead ? 'bg-neutral-400' : 'bg-success-500'}`}
                      />
                    </div> */}
                    {/* Content */}
                    <div className="flex flex-col gap-3">
                      <span className="text-b4">
                        {notification.description}
                      </span>
                      <span className="text-b5 text-neutral-400">
                        {notification.date}
                      </span>
                    </div>
                  </div>
                </DropdownMenuItem>
                {index < notifications.length - 1 && (
                  <div className="bg-turquoise-100 py-1">
                    <DropdownMenuSeparator className="bg-turquoise-200" />
                  </div>
                )}
              </div>
            ))
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
