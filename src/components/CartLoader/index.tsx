import { useAppSelector } from 'hooks/useAppSelector';

const CartLoader = () => {
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-[100]'>
      <div className='bg-white size-[100%] p-[20px] rounded-[15px] flex flex-col items-center justify-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 100 100'
          preserveAspectRatio='xMidYMid'
          width='200'
          height='200'
          style={{
            background: 'transparent',
            shapeRendering: 'auto',
            display: 'block',
          }}
          xmlnsXlink='http://www.w3.org/1999/xlink'
        >
          <g>
            <g transform='rotate(0 50 50)'>
              <rect
                fill={colorTheme}
                height='12'
                width='6'
                ry='6'
                rx='3'
                y='24'
                x='47'
              >
                <animate
                  repeatCount='indefinite'
                  begin='-0.9166666666666666s'
                  dur='1s'
                  keyTimes='0;1'
                  values='1;0'
                  attributeName='opacity'
                ></animate>
              </rect>
            </g>
            <g transform='rotate(30 50 50)'>
              <rect
                fill={colorTheme}
                height='12'
                width='6'
                ry='6'
                rx='3'
                y='24'
                x='47'
              >
                <animate
                  repeatCount='indefinite'
                  begin='-0.8333333333333334s'
                  dur='1s'
                  keyTimes='0;1'
                  values='1;0'
                  attributeName='opacity'
                ></animate>
              </rect>
            </g>
            <g transform='rotate(60 50 50)'>
              <rect
                fill={colorTheme}
                height='12'
                width='6'
                ry='6'
                rx='3'
                y='24'
                x='47'
              >
                <animate
                  repeatCount='indefinite'
                  begin='-0.75s'
                  dur='1s'
                  keyTimes='0;1'
                  values='1;0'
                  attributeName='opacity'
                ></animate>
              </rect>
            </g>
            <g transform='rotate(90 50 50)'>
              <rect
                fill={colorTheme}
                height='12'
                width='6'
                ry='6'
                rx='3'
                y='24'
                x='47'
              >
                <animate
                  repeatCount='indefinite'
                  begin='-0.6666666666666666s'
                  dur='1s'
                  keyTimes='0;1'
                  values='1;0'
                  attributeName='opacity'
                ></animate>
              </rect>
            </g>
            <g transform='rotate(120 50 50)'>
              <rect
                fill={colorTheme}
                height='12'
                width='6'
                ry='6'
                rx='3'
                y='24'
                x='47'
              >
                <animate
                  repeatCount='indefinite'
                  begin='-0.5833333333333334s'
                  dur='1s'
                  keyTimes='0;1'
                  values='1;0'
                  attributeName='opacity'
                ></animate>
              </rect>
            </g>
            <g transform='rotate(150 50 50)'>
              <rect
                fill={colorTheme}
                height='12'
                width='6'
                ry='6'
                rx='3'
                y='24'
                x='47'
              >
                <animate
                  repeatCount='indefinite'
                  begin='-0.5s'
                  dur='1s'
                  keyTimes='0;1'
                  values='1;0'
                  attributeName='opacity'
                ></animate>
              </rect>
            </g>
            <g transform='rotate(180 50 50)'>
              <rect
                fill={colorTheme}
                height='12'
                width='6'
                ry='6'
                rx='3'
                y='24'
                x='47'
              >
                <animate
                  repeatCount='indefinite'
                  begin='-0.4166666666666667s'
                  dur='1s'
                  keyTimes='0;1'
                  values='1;0'
                  attributeName='opacity'
                ></animate>
              </rect>
            </g>
            <g transform='rotate(210 50 50)'>
              <rect
                fill={colorTheme}
                height='12'
                width='6'
                ry='6'
                rx='3'
                y='24'
                x='47'
              >
                <animate
                  repeatCount='indefinite'
                  begin='-0.3333333333333333s'
                  dur='1s'
                  keyTimes='0;1'
                  values='1;0'
                  attributeName='opacity'
                ></animate>
              </rect>
            </g>
            <g transform='rotate(240 50 50)'>
              <rect
                fill={colorTheme}
                height='12'
                width='6'
                ry='6'
                rx='3'
                y='24'
                x='47'
              >
                <animate
                  repeatCount='indefinite'
                  begin='-0.25s'
                  dur='1s'
                  keyTimes='0;1'
                  values='1;0'
                  attributeName='opacity'
                ></animate>
              </rect>
            </g>
            <g transform='rotate(270 50 50)'>
              <rect
                fill={colorTheme}
                height='12'
                width='6'
                ry='6'
                rx='3'
                y='24'
                x='47'
              >
                <animate
                  repeatCount='indefinite'
                  begin='-0.16666666666666666s'
                  dur='1s'
                  keyTimes='0;1'
                  values='1;0'
                  attributeName='opacity'
                ></animate>
              </rect>
            </g>
            <g transform='rotate(300 50 50)'>
              <rect
                fill={colorTheme}
                height='12'
                width='6'
                ry='6'
                rx='3'
                y='24'
                x='47'
              >
                <animate
                  repeatCount='indefinite'
                  begin='-0.08333333333333333s'
                  dur='1s'
                  keyTimes='0;1'
                  values='1;0'
                  attributeName='opacity'
                ></animate>
              </rect>
            </g>
            <g transform='rotate(330 50 50)'>
              <rect
                fill={colorTheme}
                height='12'
                width='6'
                ry='6'
                rx='3'
                y='24'
                x='47'
              >
                <animate
                  repeatCount='indefinite'
                  begin='0s'
                  dur='1s'
                  keyTimes='0;1'
                  values='1;0'
                  attributeName='opacity'
                ></animate>
              </rect>
            </g>
            <g></g>
          </g>
        </svg>
        <p className='text-[20px]'>Вас скоро переведет на оплату</p>
      </div>
    </div>
  );
};

export default CartLoader;
