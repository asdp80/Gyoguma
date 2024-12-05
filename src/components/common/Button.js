// 버튼 컴포넌트
// 로그인, 상품 등록, 채팅하기 등
import clsx from "clsx"

const Button = (props) => {
    const { // 기본값
        children, 
        onClick=null, 
        className='',
        isLink=false,
        Link='/'
    } = props
    // 기본 스타일, clsx를 통해 붙여줌
    const baseClass='px-4 py-2 bg-gyoguma text-white rounded-lg hover:bg-gyoguma-dark'

    return (
        <>
            {isLink ? (
                <Link 
                className={clsx(baseClass, className)} 
                to={Link}>
                {children}
                </Link>
            ) : (
                <button
                className={clsx(baseClass, className)}
                onClick={onClick}>
                {children}
                </button>
            )}
        </>
        
        
    )
}

export default Button