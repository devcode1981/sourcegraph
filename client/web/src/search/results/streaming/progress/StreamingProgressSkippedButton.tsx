import classNames from 'classnames'
import AlertCircleIcon from 'mdi-react/AlertCircleIcon'
import InformationOutlineIcon from 'mdi-react/InformationOutlineIcon'
import React, { useCallback, useState, useMemo } from 'react'
import { ButtonDropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import { defaultProgress, StreamingProgressProps } from './StreamingProgress'
import { StreamingProgressSkippedPopover } from './StreamingProgressSkippedPopover'

export const StreamingProgressSkippedButton: React.FunctionComponent<StreamingProgressProps> = ({
    progress = defaultProgress,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(() => setIsOpen(previous => !previous), [setIsOpen])

    const skippedWithWarning = useMemo(() => progress.skipped.some(skipped => skipped.severity === 'warn'), [progress])

    return (
        <>
            {progress.skipped.length > 0 && (
                <ButtonDropdown isOpen={isOpen} toggle={toggleOpen}>
                    <DropdownToggle
                        className={classNames('streaming-progress__skipped mb-0 ml-2 d-flex align-items-center', {
                            'streaming-progress__skipped--warning': skippedWithWarning,
                        })}
                        caret={true}
                        color="secondary"
                    >
                        {skippedWithWarning ? (
                            <AlertCircleIcon className="mr-2 icon-inline" />
                        ) : (
                            <InformationOutlineIcon className="mr-2 icon-inline" />
                        )}
                        Some results excluded
                    </DropdownToggle>
                    <DropdownMenu className="streaming-progress__skipped-popover">
                        <StreamingProgressSkippedPopover progress={progress} />
                    </DropdownMenu>
                </ButtonDropdown>
            )}
        </>
    )
}
