// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma abicoder v1;

import "@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol";
import "./interfaces/IDaiLikePermit.sol";

contract Permitable {
    error BadPermitLength();

    function _permit(address token, bytes calldata permit) internal virtual {
        if (permit.length > 0) {
            bool success;
            bytes memory result;
            if (permit.length == 32 * 7) {
                // solhint-disable-next-line avoid-low-level-calls
                (success, result) = token.call(abi.encodePacked(IERC20Permit.permit.selector, permit));
            } else if (permit.length == 32 * 8) {
                // solhint-disable-next-line avoid-low-level-calls
                (success, result) = token.call(abi.encodePacked(IDaiLikePermit.permit.selector, permit));
            } else {
                revert BadPermitLength();
            }
            if (!success) {
                // bubble up revert reason from permit call
                assembly {  // solhint-disable-line no-inline-assembly
                    returndatacopy(0, 0, returndatasize())
                    revert(0, returndatasize())
                }
            }
        }
    }
}