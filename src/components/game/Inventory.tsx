import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import './Inventory.css';

export function Inventory() {
  const { state } = useGame();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const toggleInventory = () => {
    setIsExpanded(!isExpanded);
  };

  const handleItemClick = (itemId: string) => {
    setSelectedItem(selectedItem === itemId ? null : itemId);
  };

  const getItemIcon = (type: string): string => {
    switch (type) {
      case 'key': return '🔑';
      case 'document': return '📄';
      case 'usb': return '💾';
      case 'note': return '📝';
      case 'misc': return '📦';
      default: return '❓';
    }
  };

  const selectedItemData = selectedItem 
    ? state.inventory.find(item => item.id === selectedItem)
    : null;

  return (
    <div className={`inventory ${isExpanded ? 'inventory--expanded' : ''}`}>
      {/* Inventory toggle button */}
      <button 
        className="inventory-toggle"
        onClick={toggleInventory}
        title={isExpanded ? '인벤토리 닫기' : '인벤토리 열기'}
      >
        <span className="inventory-icon">🎒</span>
        <span className="inventory-count">{state.inventory.length}</span>
      </button>

      {/* Inventory content */}
      {isExpanded && (
        <div className="inventory-content">
          <div className="inventory-header">
            <h3>보유 아이템</h3>
            <button 
              className="inventory-close"
              onClick={toggleInventory}
              title="닫기"
            >
              ✕
            </button>
          </div>

          <div className="inventory-body">
            {state.inventory.length === 0 ? (
              <div className="inventory-empty">
                <p>아직 아이템이 없습니다</p>
                <small>탐색을 통해 아이템을 수집하세요</small>
              </div>
            ) : (
              <>
                <div className="inventory-grid">
                  {state.inventory.map((item) => (
                    <div
                      key={item.id}
                      className={`inventory-item ${
                        selectedItem === item.id ? 'inventory-item--selected' : ''
                      }`}
                      onClick={() => handleItemClick(item.id)}
                      title={item.name}
                    >
                      <div className="item-icon">
                        {getItemIcon(item.type)}
                      </div>
                      <div className="item-name">{item.name}</div>
                    </div>
                  ))}
                </div>

                {/* Item details */}
                {selectedItemData && (
                  <div className="item-details">
                    <h4>{selectedItemData.name}</h4>
                    <p className="item-description">
                      {selectedItemData.description}
                    </p>
                    {selectedItemData.canCombine && selectedItemData.canCombine.length > 0 && (
                      <div className="item-combinations">
                        <small>조합 가능: {selectedItemData.canCombine.join(', ')}</small>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}