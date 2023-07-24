import React, { useEffect, useRef } from 'react';
import { Modal } from '@arco-design/web-react';


export function openCommandModal(code: string) {
    Modal.success({
        title: null,
        className: 'top-4 opencomandModal',
        footer: null,
        icon: null,
        
        content: <RunCommandModal code={code} />,
    });
}

export const RunCommandModal: React.FC<{ code: string }> = React.memo((props) => {
    return (
        <div className="quick-input-widget show-file-icons" tabIndex={-1}>

            <div className="quick-input-titlebar" >
                <div className="monaco-action-bar animated quick-input-left-action-bar">
                    <ul className="actions-container" role="toolbar">
                    </ul>
                </div>
                <div className="quick-input-title" >&nbsp;</div>
                <div className="monaco-action-bar animated quick-input-right-action-bar">
                    <ul className="actions-container" role="toolbar">
                    </ul>
                </div>
            </div>
            <div className="quick-input-description" ></div>
            <div className="quick-input-header">
                <input className="quick-input-check-all" type="checkbox" aria-label="Toggle all checkboxes" />
                <div className="quick-input-description" ></div>
                <div className="quick-input-and-message">
                    <div className="quick-input-filter">
                        <div className="quick-input-box">
                            <div className="monaco-findInput">
                                <div className="monaco-inputbox idle" >
                                    <div className="ibwrapper">
                                        <input className="input empty" autoCorrect="off" autoCapitalize="off" spellCheck="false" type="text"  aria-describedby="quickInput_message" placeholder="Search files by name (append : to go to line or @ to go to symbol)" aria-label="Search files by name (append : to go to line or @ to go to symbol)" role="combobox" aria-haspopup="true" aria-autocomplete="list" aria-activedescendant="list_id_29_0" />
                                    </div>
                                </div>
                                <div className="controls" ></div>
                            </div>
                        </div>
                        <div className="quick-input-visible-count" aria-live="polite" aria-atomic="true">
                            <div className="monaco-count-badge" title="">156 Results</div>
                        </div>
                        <div className="quick-input-count" aria-live="polite" >
                            <div className="monaco-count-badge" title="">0 Selected</div>
                        </div>
                    </div>
                    <div id="quickInput_message" className="quick-input-message" >Press 'Enter' to confirm your input or 'Escape' to cancel</div>
                </div>
                <div className="quick-input-action" >
                    <a className="monaco-button monaco-text-button" tabIndex={0} role="button" >OK</a>
                </div>
                <div className="quick-input-action" >
                    <a className="monaco-button monaco-text-button" tabIndex={0} role="button" title="" ></a>
                </div>
            </div>
            <div className="monaco-progress-container quick-input-progress done" role="progressbar" >
                <div className="progress-bit" ></div>
            </div>
            <div className="quick-input-list">
                <div className="monaco-list list_id_29 mouse-support selection-none element-focused" tabIndex={0} role="listbox" aria-label="Quick Input" data-keybinding-context="88" id="quickInput_list" aria-activedescendant="list_id_29_0">
                    <div className="monaco-scrollable-element " role="presentation">
                        <div className="monaco-list-rows" >
                            <div className="monaco-list-row focused" role="option" id="list_id_29_0" aria-label="index.html, recently opened" draggable="false" >
                                <div className="quick-input-list-entry quick-input-list-separator-border has-actions">
                                    <label className="quick-input-list-label">
                                        <input className="quick-input-list-checkbox" type="checkbox" />
                                        <div className="quick-input-list-rows">
                                            <div className="quick-input-list-row">
                                                <div className="monaco-icon-label file-icon masterit-name-dir-icon index.html-name-file-icon name-file-icon html-ext-file-icon ext-file-icon html-lang-file-icon" >
                                                    <div className="monaco-icon-label-container">
                                                        <span className="monaco-icon-name-container">
                                                            <a className="label-name">
                                                                <span className="monaco-highlighted-label">index.html</span>
                                                            </a>
                                                        </span>
                                                        <span className="monaco-icon-description-container">
                                                            <span className="label-description">
                                                                <span className="monaco-highlighted-label"></span>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="quick-input-list-entry-keybinding">
                                                    <div className="monaco-keybinding">
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="quick-input-list-row">
                                                <div className="quick-input-list-label-meta">
                                                    <div className="monaco-icon-label">
                                                        <div className="monaco-icon-label-container">
                                                            <span className="monaco-icon-name-container"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                    <div className="quick-input-list-separator">recently opened</div>
                                    <div className="monaco-action-bar animated quick-input-list-entry-action-bar">
                                        <ul className="actions-container" role="toolbar">
                                            <li className="action-item" role="presentation" title="Open to the Side">
                                                <a className="action-label codicon codicon-split-horizontal" role="button" aria-label="Open to the Side" tabIndex={0}></a>
                                            </li>
                                            <li className="action-item" role="presentation" title="Remove from Recently Opened">
                                                <a className="action-label codicon codicon-close" role="button" aria-label="Remove from Recently Opened"></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
});
RunCommandModal.displayName = 'RunCodeModal';