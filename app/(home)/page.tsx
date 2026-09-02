import Featured from "@/components/featured";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiSearch2Line } from "@remixicon/react";

export default function Home() {
  return (
    <div className="mx-auto min-h-svh w-full px-4 sm:w-9/12 sm:px-0 mt-5">
      <Featured />
      <Separator className={"my-8"} />
      <Tabs className={""}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <Button size={"icon"} variant={"outline"}>
            <RiSearch2Line />
          </Button>
        </div>
        <TabsContent value={"for-you"}>
          <h2>Hwllo</h2>
        </TabsContent>
        <TabsContent value={"following"}>
          <h2>Hwllo 22</h2>
        </TabsContent>
      </Tabs>
    </div>
  );
}
