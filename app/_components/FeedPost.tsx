import type {
  FeedAuthor,
  FeedPost as FeedPostData,
  PostKind,
} from "../_data/feed";

type FeedPostProps = {
  post: FeedPostData;
};

const kindStyles: Record<
  PostKind,
  { label: string; badgeClassName: string; dotClassName: string }
> = {
  achievement: {
    label: "LOGRO",
    badgeClassName: "bg-achievement-bg text-achievement-fg",
    dotClassName: "bg-achievement-fg",
  },
  activity: {
    label: "ACTIVIDAD",
    badgeClassName: "bg-activity-bg text-activity-fg",
    dotClassName: "bg-activity-fg",
  },
  announcement: {
    label: "ANUNCIO",
    badgeClassName: "bg-announcement-bg text-announcement-fg",
    dotClassName: "bg-announcement-fg",
  },
};

function HeartIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="#E0654A"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
    </svg>
  );
}

function AuthorAvatar({ author }: { author: FeedAuthor }) {
  if (author.kind === "child") {
    return (
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#A9D9E8] font-display text-[17px] font-semibold text-[#1F7A93]">
        {author.initial}
      </span>
    );
  }

  return (
    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-announcement-bg text-announcement-fg">
      <MegaphoneIcon />
    </span>
  );
}

function PhotoPlaceholder({ alt }: { alt: string }) {
  return (
    <span
      aria-disabled="true"
      className="mt-3.5 flex h-[200px] flex-col items-center justify-center gap-2 rounded-[16px] border-[1.5px] border-dashed border-photo-line bg-photo-bg text-photo-fg"
    >
      <PhotoIcon />
      <span className="text-[13.5px]">{alt}</span>
    </span>
  );
}

export default function FeedPost({ post }: FeedPostProps) {
  const kind = kindStyles[post.kind];
  const authorName =
    post.author.kind === "child" ? post.author.name : post.author.label;

  return (
    <article className="rounded-[20px] border border-line bg-surface px-[22px] py-5 shadow-card">
      <header className="mb-[14px] flex items-center gap-3">
        <AuthorAvatar author={post.author} />
        <div className="flex-1">
          <div className="font-display text-[16.5px] font-semibold text-ink">
            {authorName}
          </div>
          <div className="text-[12.5px] text-muted">
            {post.time} · publicado por {post.publishedBy}
          </div>
        </div>
        <span
          className={`flex items-center gap-[7px] rounded-full px-3 py-1.5 ${kind.badgeClassName}`}
        >
          <span
            className={`h-2 w-2 rounded-full ${kind.dotClassName}`}
            aria-hidden="true"
          />
          <span className="text-xs font-extrabold tracking-[.5px]">
            {kind.label}
          </span>
        </span>
      </header>

      <div className="mb-2.5 text-[12.5px] text-muted">
        Para: {post.recipient}
      </div>
      <p className="text-[15.5px] leading-[1.55] text-ink-soft">{post.body}</p>

      {post.photo ? <PhotoPlaceholder alt={post.photo.alt} /> : null}

      <footer className="mt-4 flex items-center gap-[18px] border-t border-line-soft pt-3.5">
        <span className="flex items-center gap-[7px] text-sm font-bold text-[#E0654A]">
          <HeartIcon />
          {post.likes}
        </span>
        <span
          aria-disabled="true"
          className="flex items-center gap-[7px] text-sm font-bold text-muted-strong"
        >
          <CommentIcon />
          {post.comments}
        </span>
        <span className="flex-1" aria-hidden="true" />
        <span
          aria-disabled="true"
          className="text-sm font-extrabold text-accent-strong"
        >
          Editar
        </span>
      </footer>
    </article>
  );
}
