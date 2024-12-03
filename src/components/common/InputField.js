// 재사용 가능한 입력 필드
// 이메일, 비밀번호, 텍스트 등
import clsx from "clsx"

const InputField = (props) => {
    const { // 기본값 지정
        type='text',
        className='',
        name='',
        value='',
        placeholder='text',
        onChange=null,
    } = props
    const baseClass = 'w-full px-4 py-2 rounded-md  border-2 border-gyoguma focus:border-gyoguma-dark outline-none'

    return (
        <input
            type={type}
            className={clsx(baseClass, className)}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

export default InputField