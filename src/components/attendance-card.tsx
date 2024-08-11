import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

export const AttendanceCard = ({
  data,
}: {
  data: { Sesi: string; Waktu: string; Status: string };
}) => {
  const { Sesi, Waktu, Status } = data;
  return (
    <Card className="w-full px-6 py-4 bg-card-radial border-turquoise-300 border-2 rounded-[12px]">
      <CardContent className="p-0 flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-subheading font-bold text-b3 text-blue-500">
            {Sesi}
          </h1>
          <h2 className="font-subheading font-normal text-b4 text-blue-500">
            Waktu: {Waktu}
          </h2>
        </div>
        {Status === 'BELUM ABSEN' && (
          <Button className="bg-pink-400 h-fit px-5 py-2 text-xs font-subheading font-normal text-shade-200 rounded-[4px] hover:bg-pink-500/80">
            Tandai Hadir
          </Button>
        )}
        {Status === 'HADIR' && (
          <Badge
            variant="kehadiran"
            className="bg-success-200 border-success-600 text-success-600"
          >
            Hadir
          </Badge>
        )}
        {Status === 'TIDAK HADIR' && (
          <Badge
            variant="kehadiran"
            className="bg-error-200 border-error-600 text-error-600"
          >
            Tidak Hadir
          </Badge>
        )}
        {Status === 'SAKIT' && (
          <Badge
            variant="kehadiran"
            className="bg-orange-100 border-orange-400 text-orange-500"
          >
            Sakit
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};
