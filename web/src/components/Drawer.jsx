import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WORK } from "../data/work.js";

function GalleryImage({ src, caption }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="placeholder">Image coming soon</div>;
  return <img src={src} alt={caption} onError={() => setFailed(true)} />;
}

export default function Drawer({ selectedId, onClose }) {
  const item = WORK.find((w) => w.id === selectedId);

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            className="drawer-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.aside
            className="drawer"
            role="dialog"
            aria-label={item.name}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <button className="drawer-close" onClick={onClose} aria-label="Close">
              ×
            </button>
            <p className="eyebrow">{item.org}</p>
            <h3>{item.name}</h3>
            <p className="org-dates">{item.dates}</p>
            <div className="tags">
              {item.tags.map((t) => (
                <span key={t} className="tag-chip">
                  {t}
                </span>
              ))}
            </div>
            <p className="desc">{item.desc}</p>
            {item.links?.length > 0 && (
              <div className="links">
                {item.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                ))}
              </div>
            )}
            {item.caseStudy && (
              <>
                <div className="gallery">
                  {item.caseStudy.gallery.map((g) => (
                    <figure key={g.caption}>
                      <GalleryImage src={g.src} caption={g.caption} />
                      <figcaption>{g.caption}</figcaption>
                    </figure>
                  ))}
                </div>
                {item.caseStudy.notes.map((n) => (
                  <article className="case-note" key={n.title}>
                    <h4>{n.title}</h4>
                    <p>{n.body}</p>
                  </article>
                ))}
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
