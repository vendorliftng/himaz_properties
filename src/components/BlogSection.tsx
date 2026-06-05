'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, ArrowUpRight } from 'lucide-react'
import { blogPosts } from '@/lib/data'

export default function BlogSection() {
  return (
    <section id="insights" className="py-24 bg-himaz-brown relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-himaz-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm text-himaz-gold font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Adamawa Insights
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Local Market <span className="text-himaz-gold">Intelligence</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Stay ahead with area guides, infrastructure updates, and investment insights for Adamawa State.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <a href={`/blog/${post.slug}`} className="group block">
                <div className="glass-dark rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-himaz-brown-light to-himaz-brown flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,162,39,0.2)_0%,transparent_70%)]" />
                    <span className="font-display text-4xl font-bold text-white/10">
                      {post.category.charAt(0)}
                    </span>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-himaz-gold/90 text-himaz-brown">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
                      <span>{new Date(post.publishedAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white group-hover:text-himaz-gold transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-white/60 line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-1 text-sm text-himaz-gold font-medium group-hover:gap-2 transition-all">
                      Read Article
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}