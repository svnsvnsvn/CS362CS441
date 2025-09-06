'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

type ComponentProps = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          h1: ({ children }: ComponentProps) => (
            <h1 className="text-3xl font-semibold text-slate-700 mb-8">
              {children}
            </h1>
          ),
          h2: ({ children }: ComponentProps) => (
            <h2 className="text-2xl font-medium text-slate-600 mt-10 mb-6">
              {children}
            </h2>
          ),
          h3: ({ children }: ComponentProps) => (
            <h3 className="text-xl font-medium text-slate-600 mt-8 mb-4">
              {children}
            </h3>
          ),
          h4: ({ children }: ComponentProps) => (
            <h4 className="text-lg font-medium text-slate-600 mt-6 mb-3">
              {children}
            </h4>
          ),
          h5: ({ children }: ComponentProps) => (
            <h5 className="text-base font-medium text-slate-600 mt-4 mb-2">
              {children}
            </h5>
          ),
          h6: ({ children }: ComponentProps) => (
            <h6 className="text-sm font-medium text-slate-600 mt-4 mb-2">
              {children}
            </h6>
          ),
          p: ({ children, className }: ComponentProps) => {
            const isQuestionBlock = className === 'question-block';
            
            if (isQuestionBlock) {
              return (
                <div className="my-6 p-4 bg-pink-50 rounded-xl border-l-4 border-pink-300">
                  <div className="text-slate-600 leading-relaxed">
                    {children}
                  </div>
                </div>
              );
            }
            
            return (
              <p className="text-slate-600 leading-relaxed mb-4">
                {children}
              </p>
            );
          },
          blockquote: ({ children }: ComponentProps) => (
            <blockquote className="my-6 pl-4 border-l-4 border-pink-300 bg-pink-50 py-3 rounded-r-xl">
              <div className="text-slate-500 italic">
                {children}
              </div>
            </blockquote>
          ),
          ul: ({ children }: ComponentProps) => (
            <ul className="list-disc list-inside mb-4 text-slate-600 space-y-1 ml-4">
              {children}
            </ul>
          ),
          ol: ({ children }: ComponentProps) => (
            <ol className="list-decimal list-inside mb-4 text-slate-600 space-y-1 ml-4">
              {children}
            </ol>
          ),
          li: ({ children }: ComponentProps) => (
            <li className="text-slate-600 leading-relaxed">
              {children}
            </li>
          ),
          table: ({ children }: ComponentProps) => (
            <div className="table-container">
              <table className="markdown-table">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }: ComponentProps) => (
            <thead>
              {children}
            </thead>
          ),
          tbody: ({ children }: ComponentProps) => (
            <tbody>
              {children}
            </tbody>
          ),
          tr: ({ children }: ComponentProps) => (
            <tr>
              {children}
            </tr>
          ),
          th: ({ children }: ComponentProps) => (
            <th>
              {children}
            </th>
          ),
          td: ({ children }: ComponentProps) => (
            <td>
              {children}
            </td>
          ),
          code: ({ className, children }: ComponentProps) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (language) {
              return (
                <div className="my-4 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                  <SyntaxHighlighter
                    style={oneLight}
                    language={language}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      background: '#fafafa',
                      fontSize: '14px',
                      lineHeight: '1.5',
                    }}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              );
            }
            
            return (
              <code className="bg-pink-100 text-slate-700 px-2 py-1 rounded-md text-sm font-mono border border-pink-200">
                {children}
              </code>
            );
          },
          pre: ({ children }: ComponentProps) => (
            <div className="overflow-x-auto">
              {children}
            </div>
          ),
          strong: ({ children }: ComponentProps) => (
            <strong className="font-semibold text-slate-700">
              {children}
            </strong>
          ),
          em: ({ children }: ComponentProps) => (
            <em className="italic text-slate-600">
              {children}
            </em>
          ),
          a: ({ children, href }: ComponentProps) => (
            <a 
              href={href} 
              className="text-pink-600 hover:text-pink-700 underline decoration-pink-300 hover:decoration-pink-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          hr: () => (
            <hr className="my-8 border-0 border-t border-pink-200" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
