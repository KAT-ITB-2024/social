// import Link from "next/link";
// import { getServerAuthSession } from "~/server/auth";
// import { api } from "~/trpc/server";
import { Button } from '@/components/ui/button';
import AssignmentCard from '@/components/AssignmentCard';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 lg:py-16 ">
        Social (Coming Soon)
      </div>
      <AssignmentCard status="terkumpul"/>
      <AssignmentCard status="belumterkumpul" />
      <AssignmentCard status="terlambat" />
      <h1 className="text-h1 font-heading text-turquoise-100">Heading 1</h1>
      <h2 className="sh1 text-pink-100">Subheading 1</h2>
      <h3 className="sh2 text-blue-100">Subheading 2</h3>
      <p className="text-b1 font-body text-shade-100">
        This is a body text with normal weight.
      </p>
      <Button variant="default">Button</Button>
      <h1 className="text-h1 font-heading text-turquoise-100">Heading 1</h1>
      <h2 className="sh1 text-pink-100">Subheading 1</h2>
      <h3 className="sh2 text-blue-100">Subheading 2</h3>
      <p className="text-b1 font-body text-shade-100">
        This is a body text with normal weight.
      </p>
      <Button variant="default">Button</Button>
      <h1 className="text-h1 font-heading text-turquoise-100">Heading 1</h1>
      <h2 className="sh1 text-pink-100">Subheading 1</h2>
      <h3 className="sh2 text-blue-100">Subheading 2</h3>
      <p className="text-b1 font-body text-shade-100">
        This is a body text with normal weight.
      </p>
      <Button variant="default">Button</Button>
    </main>
  );
}
