import React from 'react'
import { NotificationCancelIcon } from '../icons/notification_cancel_icon'
import { NotificationCheckmarkIcon } from '../icons/notification_checkmark_icon'
import { ProcessingIcon } from '../icons/processing_icon'

import { StepsProgress } from './steps_progress'

enum StepStatus {
  ConfirmOnMetamask,
  Loading,
  Done,
  Error,
}

interface WithChildren {
  children: React.ReactNode
}

const StepStatusConfirmOnMetamask = (props: React.Props<WithChildren>) => (
  <>
    <div className="metamask-icon-large to-bottom" />
    {props.children}
  </>
)

const StepStatusLoading = (props: React.Props<WithChildren>) => (
  <>
    <div className="icon-container">
      <div className="icon-spin">
        <ProcessingIcon />
      </div>
    </div>
    {props.children}
  </>
)

const StepStatusDone = (props: React.Props<WithChildren>) => (
  <>
    <div className="icon-container">
      <NotificationCheckmarkIcon />
    </div>
    {props.children}
  </>
)

interface ErrorMessage {
  message: string
}

const StepStatusError = (props: React.Props<WithChildren> & ErrorMessage) => (
  <>
    <small>{props.message}</small>
    <div className="icon-container">
      <NotificationCancelIcon />
    </div>
    {props.children}
  </>
)

const StepsTimeline = (props: React.Props<WithChildren>) => (
  <div className="steps-time-line">{StepsProgress}</div>
)

const Title = (props: React.Props<WithChildren>) => (
  <h1 className="steps-title">{props.children}</h1>
)

const ModalContent = (props: React.Props<WithChildren>) => (
  <div className="steps-modal-content">{props.children}</div>
)

const ModalText = (props: React.Props<WithChildren>) => (
  <p className="steps-modal-p">{props.children}</p>
)

const ModalStatusText = (props: React.Props<WithChildren>) => (
  <p className="modal-status-text">{props.children}</p>
)

const ModalStatusTextLight = (props: React.Props<WithChildren>) => (
  <p className="modal-status-text light">{props.children}</p>
)

export {
  ModalContent,
  ModalStatusText,
  ModalStatusTextLight,
  ModalText,
  StepStatus,
  StepStatusConfirmOnMetamask,
  StepStatusDone,
  StepStatusError,
  StepStatusLoading,
  StepsTimeline,
  Title,
}
