export default function AnimacaoFade({ children, delay = '0s' }) {
  return (
    <div 
      className="efeito-fade-subida" 
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  )
}