import React from 'react';
import { Spin } from 'antd';
import type { SpinProps } from 'antd';

interface LoaderProps extends SpinProps {
  fullScreen?: boolean;
}

/**
 * Loader
 * @param fullScreen — если true, спиннер по центру экрана на полную ширину/высоту
 * @param other props — любые пропсы SpinProps
 */
const Loader: React.FC<LoaderProps> = ({ fullScreen = false, ...props }) => {
  if (fullScreen) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.65)',
          zIndex: 1000,
        }}
      >
        <Spin size="large" {...props} />
      </div>
    );
  }

  return <Spin {...props} />;
};

export default Loader;
