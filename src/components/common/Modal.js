import Button from "./Button"

// 팝업 등(확인/경고 메시지/탈퇴?/리뷰?/..)
const Modal = (props) => {
    const {
        isOpen='false',
        children,
        onClose,
    } = props

    if(!isOpen) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='flex flex-col justify-center bg-white rounded-lg shadow-lg w-1/3 p-6'>
                {children}
                <Button
                onClick={onClose}>
                    확인
                </Button>
            </div>
            
        </div>
    )
}

export default Modal


/*
초간단 모달 사용법 :

// 모달 오픈 여부를 결정하는 state
const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
    <Button <- 모달을 여는 버튼
    isLink={false}
    onClick={() => setModalOpen(true)}>
      모달 열기
    </Button>

    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}> <- 모달 닫는것도 넘겨줘야함
      모달입니당
    </Modal>
  )
*/