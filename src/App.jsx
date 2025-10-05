import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------- Mock Data ----------------
const posts = [
  {
    id: "soft-ui-design",
    title: "柔和色彩与圆角在博客中的应用",
    excerpt:
      "如何用柔和配色、圆角与留白，打造舒适耐读的网页体验。本文涵盖布局、色板与组件风格。",
    cover:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    content: `在现代网页设计中，柔和色彩（Pastel）与圆角（Rounded Corners）能有效降低视觉噪音，让用户更专注于内容本身。

**要点**：
1. 使用低饱和度色板，控制对比度与可读性。
2. 大圆角 + 阴影用于容器，分隔信息层级。
3. 充足留白与 16–20px 行高提升阅读舒适度。
4. 采用系统字体或可读性高的无衬线字体。

**布局建议**：
- 移动端优先，栅格最大宽度 1200px。
- 卡片式文章列表，强化可扫描性。

**交互**：
- 轻微悬停动效与过渡，降低突兀感。
- 可选夜间模式以保护视力。`,
    tags: ["设计", "前端", "UI"],
    date: "2025-09-20",
  },
  {
    id: "content-structure",
    title: "博客内容结构：从首页到内页",
    excerpt:
      "规划首页、栏目内页与文章页的信息层级：导航、精选、最新、分类、面包屑与相关文章。",
    cover:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    content: `内容结构决定可发现性。首页承担“导览 + 精选”，内页负责“纵深 + 聚合”，文章页聚焦“正文 + 关系”。

**首页**：精选区、最新文章、分类入口、订阅。
**内页（例如：栏目/标签页）**：该类别下的文章列表，分页与筛选。
**文章页**：标题、时间、标签、正文、目录、上一篇/下一篇、相关文章。`,
    tags: ["产品", "信息架构"],
    date: "2025-09-12",
  },
  {
    id: "writing-flow",
    title: "写作流程与发布清单",
    excerpt:
      "用一张“发布前检查表”减少低级错误：标题、摘要、封面、图注、ALT 文本、链接、SEO。",
    cover:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop",
    content: `**发布检查表**：
- 标题简洁有力（<= 60 字符），摘要清晰。
- 图片含 ALT 文本，注意版权。
- 段落 3–5 行，列表化要点。
- 内链到相关内容，修复死链。
- 设定封面、标签与发布时间。
- 预览移动端与深色模式。`,
    tags: ["写作", "运营"],
    date: "2025-08-28",
  },
];

const pastel = {
  bg: "bg-gradient-to-br from-rose-50 via-sky-50 to-emerald-50",
  card: "bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60",
  textMuted: "text-slate-500",
};

function classNames(...args) {
  return args.filter(Boolean).join(" ");
}

function useRouter() {
  const [route, setRoute] = useState({ name: "home" });
  const navigate = (next) => setRoute(next);
  return { route, navigate };
}

const Shell = ({ children }) => (
  <div className={classNames(pastel.bg, "min-h-screen text-slate-800")}>
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
      {children}
    </div>
  </div>
);

const Nav = ({ onNav, route }) => {
  const items = [
    { key: "home", label: "首页" },
    { key: "inner", label: "内页（栏目）" },
    { key: "articles", label: "文章列表" },
  ];
  return (
    <div className="sticky top-4 z-50">
      <div
        className={classNames(
          pastel.card,
          "rounded-2xl shadow-md border border-slate-200/60"
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <button onClick={() => onNav({ name: "home" })}>
            <span className="font-semibold text-slate-700">MySoftBlog</span>
          </button>
          <div className="flex items-center gap-2">
            {items.map((it) => (
              <button
                key={it.key}
                onClick={() => onNav({ name: it.key })}
                className={classNames(
                  "px-3 py-2 rounded-xl text-sm transition",
                  route.name === it.key
                    ? "bg-sky-100/70 text-sky-900"
                    : "hover:bg-slate-100/60 text-slate-700"
                )}
              >
                {it.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ title, desc }) => (
  <div className="mb-4">
    <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
    {desc && <p className={classNames("mt-1", pastel.textMuted)}>{desc}</p>}
  </div>
);

const Card = ({ children, className }) => (
  <div
    className={classNames(
      pastel.card,
      "rounded-2xl shadow-sm border border-slate-200/60 p-4",
      className
    )}
  >
    {children}
  </div>
);

const ArticleCard = ({ post, onOpen }) => (
  <motion.button layout whileHover={{ y: -3 }} onClick={onOpen}>
    <Card className="overflow-hidden p-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        <img
          src={post.cover}
          alt={post.title}
          className="h-44 w-full object-cover md:h-full"
        />
        <div className="col-span-2 p-4">
          <div className="flex items-center gap-2 mb-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full bg-sky-100/80 px-2.5 py-1 text-xs font-medium text-sky-800"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className={classNames("mt-1 line-clamp-2 text-sm", pastel.textMuted)}>
            {post.excerpt}
          </p>
          <p className="mt-3 text-xs text-slate-500">{post.date}</p>
        </div>
      </div>
    </Card>
  </motion.button>
);

const ArticleBody = ({ markdown }) => {
  const html = useMemo(() => {
    const esc = (s) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return esc(markdown)
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br/>");
  }, [markdown]);
  return (
    <div
      className="prose prose-slate max-w-none mt-4"
      dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }}
    />
  );
};

// ---------------- Pages ----------------
const HomePage = ({ onOpenArticle }) => (
  <div className="space-y-6">
    <SectionTitle title="精选文章" desc="柔和风格与排版示例" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.slice(0, 2).map((p) => (
        <ArticleCard key={p.id} post={p} onOpen={() => onOpenArticle(p)} />
      ))}
    </div>
  </div>
);

const InnerPage = ({ onOpenArticle }) => (
  <div className="space-y-4">
    <SectionTitle title="栏目页" desc="展示分类文章列表" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map((p) => (
        <ArticleCard key={p.id} post={p} onOpen={() => onOpenArticle(p)} />
      ))}
    </div>
  </div>
);

const ArticlesPage = ({ onOpenArticle }) => (
  <div className="space-y-4">
    <SectionTitle title="所有文章" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map((p) => (
        <ArticleCard key={p.id} post={p} onOpen={() => onOpenArticle(p)} />
      ))}
    </div>
  </div>
);

const ArticlePage = ({ post, onBack }) => (
  <div className="space-y-4">
    <button
      onClick={onBack}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm hover:bg-slate-100"
    >
      ← 返回
    </button>
    <Card className="p-0 overflow-hidden">
      <img src={post.cover} alt={post.title} className="h-60 w-full object-cover" />
      <div className="p-5">
        <h1 className="text-2xl md:text-3xl font-bold leading-tight">{post.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{post.date}</p>
        <ArticleBody markdown={post.content} />
      </div>
    </Card>
  </div>
);

const Footer = () => (
  <div className="mt-8 text-center text-xs text-slate-500">
    © {new Date().getFullYear()} MySoftBlog · 柔和圆角风格设计 · React + Tailwind
  </div>
);

// ---------------- App Root ----------------
export default function App() {
  const router = useRouter();
  const [current, setCurrent] = useState(null);

  const openArticle = (p) => {
    setCurrent(p);
    router.navigate({ name: "article" });
  };

  return (
    <Shell>
      <Nav onNav={router.navigate} route={router.route} />
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route.name + (current?.id || "")}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-5"
        >
          {router.route.name === "home" && <HomePage onOpenArticle={openArticle} />}
          {router.route.name === "inner" && <InnerPage onOpenArticle={openArticle} />}
          {router.route.name === "articles" && (
            <ArticlesPage onOpenArticle={openArticle} />
          )}
          {router.route.name === "article" && current && (
            <ArticlePage post={current} onBack={() => router.navigate({ name: "articles" })} />
          )}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </Shell>
  );
}
