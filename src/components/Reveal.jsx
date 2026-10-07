import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export function useStagger(stagger = 0.08) {
  const reduce = useReducedMotion()
  const Grid = reduce ? 'div' : motion.div
  const Item = reduce ? 'div' : motion.div
  return {
    reduce,
    Grid,
    Item,
    gridProps: reduce ? {} : {
      initial: 'hidden',
      whileInView: 'show',
      viewport: { once: true, amount: 0.05, margin: '0px 0px -40px 0px' },
      variants: {
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.04 } },
      },
    },
    itemProps: reduce ? {} : {
      variants: {
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease },
        },
      },
    },
  }
}

export function Reveal({ children, className, style, delay = 0 }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className} style={style}>{children}</div>
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -32px 0px' }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
