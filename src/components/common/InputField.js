// 재사용 가능한 입력 필드
// 이메일, 비밀번호, 텍스트 등
const InputField = (props) => {
    const { // 기본값 지정
        type='text',
        placeholder='text',
        className='w-full px-4 py-2 rounded-md  border-2 border-gyoguma focus:border-gyoguma-dark outline-none',
        onChange=null,
    } = props
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={className}
            onChange={onChange}
        />
    )
}

export default InputField