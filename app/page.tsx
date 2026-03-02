import Feed from "./__components/home/Feed";
import LeftSideBar from "./__components/home/LeftSideBar";
import RightSideBar from "./__components/home/RightSideBar";


export default async function Home() {

  return (
     <div >
        <main>
                
                <div className="flex gap-4 py-5 container" >
                    <LeftSideBar />
                      <Feed/>
                    <RightSideBar />
                </div>
        </main>
     </div>
  );
}
