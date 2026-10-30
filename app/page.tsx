import FeedPost from "./_components/FeedPost";
import Sidebar from "./_components/Sidebar";
import { currentUser, posts, room } from "./_data/feed";

function CameraIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar active="feed" />
      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[760px] px-10 pt-[34px] pb-20">
          <header className="mb-6">
            <div className="mb-1 text-[12.5px] font-extrabold tracking-[.8px] text-accent">
              GUARDERÍA · {room.name.toUpperCase()}
            </div>
            <h1 className="font-display text-[30px] font-semibold text-ink">
              Buenas, {currentUser.name.split(" ")[0]}
            </h1>
            <p className="mt-[5px] text-[14.5px] text-muted-strong">
              {room.childrenCount} niños · {room.dateLabel}
            </p>
          </header>

          <span
            aria-disabled="true"
            className="mb-6 flex items-center gap-3.5 rounded-[18px] border border-line bg-surface px-[18px] py-3.5 shadow-composer"
          >
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-avatar font-display text-base font-semibold text-white">
              {currentUser.initial}
            </span>
            <span className="flex-1 text-[15px] text-muted">
              Compartí un momento…
            </span>
            <span className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] bg-accent-soft text-like">
              <CameraIcon />
            </span>
          </span>

          <div className="mb-3.5 flex items-center gap-3.5">
            <span className="text-[12.5px] font-extrabold tracking-[.8px] text-caption">
              PUBLICADO HOY
            </span>
            <span className="h-px flex-1 bg-line-strong" aria-hidden="true" />
          </div>

          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <FeedPost key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
