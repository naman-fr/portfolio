"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodePeekDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  language: string;
  explanation: string;
  projectTitle: string;
}

export default function CodePeekDrawer({
  isOpen,
  onClose,
  code,
  language,
  explanation,
  projectTitle,
}: CodePeekDrawerProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-obsidian border-l border-terminal/50 z-50 shadow-2xl overflow-y-auto"
          >
            <div className="sticky top-0 bg-obsidian/95 backdrop-blur-sm border-b border-terminal/50 p-4 flex items-center justify-between z-10">
              <div>
                <h3 className="font-mono font-bold text-terminal text-lg">{projectTitle}</h3>
                <p className="text-xs text-gray-400 font-mono mt-1">{language.toUpperCase()}</p>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={copyCode}
                  className="p-2 glass rounded-lg hover:bg-terminal/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-terminal" />
                  ) : (
                    <Copy className="w-4 h-4 text-terminal" />
                  )}
                </motion.button>
                <motion.button
                  onClick={onClose}
                  className="p-2 glass rounded-lg hover:bg-red-500/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4 text-red-400" />
                </motion.button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {explanation && (
                <div className="p-4 bg-terminal/10 border border-terminal/30 rounded-lg">
                  <p className="text-sm text-gray-300 font-mono">{explanation}</p>
                </div>
              )}

              <div className="relative">
                <SyntaxHighlighter
                  language={language}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: "0.5rem",
                    background: "#0A0A0A",
                    border: "1px solid rgba(0, 255, 65, 0.2)",
                  }}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
