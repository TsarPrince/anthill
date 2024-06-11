#include <bits/stdc++.h>
using namespace std;

#define ll long long
#define fastio                      \
  ios_base::sync_with_stdio(false); \
  cin.tie(NULL);                    \
  cout.tie(NULL);
#define nl '\n';
const int M = 1e9 + 7;
// Operator overloads
template <typename T1, typename T2>  // cin >> pair<T1, T2>
istream& operator>>(istream& istream, pair<T1, T2>& p) {
  return (istream >> p.first >> p.second);
}
template <typename T>  // cin >> vector<T>
istream& operator>>(istream& istream, vector<T>& v) {
  for (auto& it : v) cin >> it;
  return istream;
}
template <typename T1, typename T2>  // cout << pair<T1, T2>
ostream& operator<<(ostream& ostream, const pair<T1, T2>& p) {
  return (ostream << p.first << " " << p.second);
}
template <typename T>  // cout << vector<T>
ostream& operator<<(ostream& ostream, const vector<T>& c) {
  for (auto& it : c) cout << it << " ";
  return ostream;
}

bool reachedBoundary(int i, int j, int n) {
  return (i == 0 || i == n || j == 0 || j == n);
}

int f(int i, int j, int n, int steps) {
  if (steps == 0 && reachedBoundary(i, j, n)) return 1;
  if (steps == 0 || reachedBoundary(i, j, n)) return 0;
  vector<pair<int, int>> deltas = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
  int res = 0;
  for (auto delta : deltas) {
    int dx = delta.first;
    int dy = delta.second;
    res += f(i + dx, j + dy, n, steps - 1);
  }
  return res;
}

int main() {
  int n = 4;
  // pattern
  for (ll i = 0; i < 10; i++) {
    cout << i << ": " << f(n / 2, n / 2, n, i) << nl;
  }
  // ans = 4.5
  double ans = 0;
  for (int i = 2; i < 18; i++) {
    ans += (double)i / (1 << (i / 2 + 1));  // overflow in cpp
  }
  cout << ans << nl;
}
