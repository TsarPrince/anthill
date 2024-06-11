ans = 0
for i in range(2, 1000):
  ans += i / (1 << (i//2 +1))
print(ans)
