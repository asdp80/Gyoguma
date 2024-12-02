// 버튼 컴포넌트

import { Link } from "react-router-dom"

// 로그인, 상품 등록, 채팅하기 등
const Button = (props) => {
    const { // 기본값
        text='button', 
        onClick=null, 
        className='px-4 py-2 bg-gyoguma text-white rounded-lg hover:bg-gyoguma-dark',
        isLink=false,
        Link='#'
    } = props

    return (
        <>
            {isLink ? (
                <Link 
                className={className} 
                to={Link}>
                {text}
                </Link>
            ) : (
                <button
                className={className}
                onClick={onClick}>
                {text}
                </button>
            )}
        </>
        
        
    )
}

export default Button