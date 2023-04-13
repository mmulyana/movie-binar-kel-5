import imgOops from '../../assets/images/oops.png'
import { BaseLayout } from '../../components'

export default function Error() {
  return (
    <BaseLayout isLight>
      <div
        className='container'
        style={{
          paddingTop: '80px',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={imgOops} style={{ height: '500px', objectFit: 'center' }} />
      </div>
    </BaseLayout>
  )
}
