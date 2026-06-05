import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { blogPosts, getWhatsAppLink } from '@/lib/data'
import { Clock, ChevronLeft, Phone } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return { title: 'Article Not Found' }

  return {
    title: `${post.title} — Adamawa Insights | Himaz Properties`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return notFound()

  return (
    <main className="min-h-screen bg-himaz-cream">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-himaz-brown hover:text-himaz-gold transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-32 pb-12 bg-himaz-brown relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,162,39,0.15)_0%,transparent_70%)]" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-3 text-sm text-himaz-gold mb-4">
            <span className="px-3 py-1 rounded-full bg-himaz-gold/20">{post.category}</span>
            <span className="text-white/50">{new Date(post.publishedAt).toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1 text-white/50">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </header>

      {/* Content */}
      <article className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 sm:p-12 shadow-lg mb-8">
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('- ')) {
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 my-4 text-himaz-brown-light">
                      {paragraph.split('\n').map((item, i) => (
                        <li key={i}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  )
                }
                if (paragraph.startsWith('Key') || paragraph.startsWith('What') || paragraph.startsWith('Step') || paragraph.startsWith('For')) {
                  return <h3 key={index} className="font-display text-xl font-bold text-himaz-brown mt-8 mb-4">{paragraph}</h3>
                }
                return <p key={index} className="text-himaz-brown-light leading-relaxed mb-4">{paragraph}</p>
              })}
            </div>
          </div>

          {/* Author / CTA */}
          <div className="glass rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-himaz-brown rounded-full flex items-center justify-center">
                <span className="text-himaz-gold font-display font-bold text-2xl">H</span>
              </div>
              <div className="text-center sm:text-left flex-1">
                <h4 className="font-display font-bold text-himaz-brown text-lg">Himaz Properties Team</h4>
                <p className="text-sm text-himaz-brown-light">
                  Verified real estate experts in Adamawa State. We help you find, secure, and grow your property portfolio.
                </p>
              </div>
              <a
                href={getWhatsAppLink(`Hello Himaz Properties! I read your article "${post.title}" and I'd like to learn more.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-himaz-brown text-himaz-gold rounded-full font-semibold hover:bg-himaz-brown-light transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* More Articles */}
      <section className="py-12 border-t border-himaz-brown/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-himaz-brown mb-6">More Insights</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.filter((p) => p.slug !== post.slug).map((related) => (
              <a
                key={related.id}
                href={`/blog/${related.slug}`}
                className="group block glass rounded-xl p-5 shadow-sm hover:shadow-lg transition-all"
              >
                <span className="text-xs font-medium text-himaz-gold">{related.category}</span>
                <h3 className="font-display font-bold text-himaz-brown group-hover:text-himaz-gold transition-colors mt-1 line-clamp-2">
                  {related.title}
                </h3>
                <p className="text-sm text-himaz-brown-light mt-2 line-clamp-2">{related.excerpt}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-himaz-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Himaz Properties Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}