import styles from './DetailBackButton.module.css'

type DetailBackButtonProps = {
  onClick: () => void
  label?: string
}

export default function DetailBackButton({
  onClick,
  label = 'Return to list',
}: DetailBackButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label={label}
    >
      <img
        src="/assets/korn-ferry/ArrowUUpRight.svg"
        alt=""
        className={styles.icon}
        draggable={false}
      />
    </button>
  )
}
