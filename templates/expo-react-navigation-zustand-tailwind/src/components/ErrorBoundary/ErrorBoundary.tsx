import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Logger from '../../utils/Logger';

interface IProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface IState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<IProps, IState> {
  state: IState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): IState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    Logger.error('ErrorBoundary', { error: error.message, stack: info.componentStack });
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback) return this.props.fallback;

    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-2xl font-bold text-text-primary mb-2">Something went wrong</Text>
        <Text className="text-sm text-text-secondary text-center mb-8">{this.state.error?.message}</Text>
        <TouchableOpacity className="bg-primary py-3 px-6 rounded-lg" onPress={this.reset}>
          <Text className="text-white text-sm font-semibold">Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
