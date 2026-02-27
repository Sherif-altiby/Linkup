import Feed from "./__components/home/Feed";
import LeftSideBar from "./__components/home/LeftSideBar";
import RightSideBar from "./__components/home/RightSideBar";


export default async function Home() {

  return (
     <div>
        <main>
                
                <div className="flex gap-4 mt-5" >
                    <LeftSideBar />
                      <Feed/>
                    <RightSideBar />
                </div>
        </main>
     </div>
  );
}
