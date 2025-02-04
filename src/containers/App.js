import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import { Provider as BusProvider } from 'react-bus';
import { TranslateProvider } from '@u-wave/react-translate';
import { closeAll } from '../actions/OverlayActionCreators';
import { settingsSelector, themeSelector } from '../selectors/settingSelectors';
import { translatorSelector } from '../selectors/localeSelectors';
import { isConnectedSelector } from '../selectors/serverSelectors';
import DesktopApp from '../components/App';
import FatalError from '../components/FatalError';
import UwaveContext from '../context/UwaveContext';
import { ClockProvider } from '../context/ClockContext';
import MediaSourceContext from '../context/MediaSourceContext';
import { AllStoresProvider } from '../stores';

const {
  useCallback,
  useEffect,
} = React;

class ErrorWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <FatalError error={error} />
      );
    }

    return children;
  }
}

function AppContainer({ uwave, mediaSources }) {
  const activeOverlay = useSelector((state) => state.activeOverlay);
  const isConnected = useSelector(isConnectedSelector);
  const settings = useSelector(settingsSelector);
  const theme = useSelector(themeSelector);
  const translator = useSelector(translatorSelector);
  const dispatch = useDispatch();
  const onCloseOverlay = useCallback(() => dispatch(closeAll()), [dispatch]);

  useEffect(() => {
    const html = document.documentElement;
    html.dir = theme.direction;

    const root = document.body;
    Object.keys(theme.cssProperties).forEach((prop) => {
      root.style.setProperty(prop, theme.cssProperties[prop]);
    });
  }, [theme]);

  const props = {
    activeOverlay,
    isConnected,
    settings,
    onCloseOverlay,
  };

  const app = <DesktopApp {...props} />;

  return (
    <ThemeProvider theme={theme}>
      <ErrorWrapper>
        <TranslateProvider translator={translator}>
          <BusProvider>
            <ClockProvider>
              <UwaveContext.Provider value={uwave}>
                <MediaSourceContext.Provider mediaSources={mediaSources}>
                  <AllStoresProvider>
                    {app}
                  </AllStoresProvider>
                </MediaSourceContext.Provider>
              </UwaveContext.Provider>
            </ClockProvider>
          </BusProvider>
        </TranslateProvider>
      </ErrorWrapper>
    </ThemeProvider>
  );
}

AppContainer.propTypes = {
  mediaSources: PropTypes.object.isRequired,
  uwave: PropTypes.object,
};

export default AppContainer;
