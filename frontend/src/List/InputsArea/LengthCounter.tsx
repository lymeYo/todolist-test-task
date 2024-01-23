const LengthCounter = ({ length, maxLength }) => {
  const diff = maxLength - length
  let className = 'input-length-counter'
  
  if (diff < 20 && diff >= 0) className += ' input-length-counter_warn'
  else if (diff < 0) className += ' input-length-counter_dangerous'

  return diff < 20 && <span className={className}>{diff}</span>
}
export default LengthCounter
