import FeedPost from "./_components/FeedPost";
import Sidebar from "./_components/Sidebar";
import { posts } from "./_data/feed";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[760px] flex-col gap-4 px-10 py-10">
          {posts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
