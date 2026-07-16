#include <llvh/Support/Atomic.h>

#include <atomic>

namespace llvh::sys {

void MemoryFence() {
  std::atomic_thread_fence(std::memory_order_seq_cst);
}

cas_flag CompareAndSwap(volatile cas_flag *pointer, cas_flag newValue, cas_flag oldValue) {
  auto *atomicPointer = reinterpret_cast<std::atomic<cas_flag> *>(const_cast<cas_flag *>(pointer));
  atomicPointer->compare_exchange_strong(
      oldValue, newValue, std::memory_order_seq_cst, std::memory_order_seq_cst);
  return oldValue;
}

}  // namespace llvh::sys
