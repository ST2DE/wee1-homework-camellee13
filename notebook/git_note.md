# How to use Git

Reference:
* Article
[Git 簡易使用教學](https://coderwall.com/p/yl1-ug/git--2)
[連猴子都能懂的Git入門指南](https://backlog.com/git-tutorial/tw/intro/intro1_1.html)
[GIT新手入門教學 – PART 1](https://hellolynn.hpd.io/2017/01/18/git%E6%96%B0%E6%89%8B%E5%85%A5%E9%96%80%E6%95%99%E5%AD%B8-part-1/)
[GIT新手入門教學 – PART 2](https://hellolynn.hpd.io/2017/01/18/git%E6%96%B0%E6%89%8B%E5%85%A5%E9%96%80%E6%95%99%E5%AD%B8-part-2/)
[Git達人教你搞懂GitHub基礎觀念](https://www.ithome.com.tw/news/95283)
[Git Tutorial](https://github.com/twtrubiks/Git-Tutorials/blob/master/README.md)

* Video
[Git Tutorial](https://www.youtube.com/watch?v=kQSzft2Jj8Y&index=1&list=PLXO45tsB95cKysjmSNln65YoUt9lwEl7-)
[Git 教學](https://www.youtube.com/watch?v=8jFvbX2_Dy0&t=40s)

* Git practice
[Got 15 minutes and want to learn Git](https://try.github.io/levels/1/challenges/1)
[Learn Git Branching](https://learngitbranching.js.org/)

## 前言

版本控制一直是軟體開發中非常重要的工具。VCS分成**集中式版本控制系統**(Centralized Version Control System)與**分散式版本控制系統**(Decentralized Version Control System)。集中式版本系統的版本儲存庫Repository都存在**中央的伺服器**。

### 集中式版本控制系統
傳統常見的集中式版本控制系統如CVS、Subversion及Perforce等，採主從式架構，開發專案所有版本的檔案集中儲存在單一臺伺服器上。

而在開發者本機端的儲存庫上，則只會儲存最新版本的歷史紀錄，開發者如果想要提交（commit）新版本、查詢各版本差異或修改歷史紀錄，都要透過網路連到伺服器才能進行。當專案隨時間變得越來越龐大、版本越來越多，每一個人的每一個動作都要連上伺服器，就會影響了集中式版本控制系統的運作效率。

### 分散式版本控制系統
分散式版本控制系統則不同，Git是分散式版本控制，每個人都有一份完整的本機儲存庫。也就是說，除了在遠端儲存庫上如GitHub上，擁有專案各版本的完整程式碼之外，在每一個開發者本機端也還設計了一個本地端儲存庫（Repository），也儲存了所有變更過的檔案，以及專案各版本的歷史紀錄。遠端儲存庫並非是唯一一份，而是一個供多人同步專案資料用的共享版本。

透過本機端儲存庫上的這份完整專案，開發者不須透過網路便能提交新版本的程式碼到本機端儲存庫。等到需要將本機端儲存庫上資料同步到遠端儲存庫時，才需要使用網路，在Git上，這個指令就是推（Push）。所以，開發者進行版本控制的彈性變大，對網路的依賴也減低。

### 了解集中式和分散式版本控管的差異

集中式版本控制系統的優點：
1. 可以在遠端進行集中式的權限控管，限制使用者開啟某些目錄的權限
2. 分散式的Git上要做權限控管就稍微麻煩。因為人人都能取得完整程式碼，要限制存取權限，只能將程式碼依可開放權限，分散在多個遠端儲存庫，限制開發者只能存取符合權限的特定儲存庫。

集中式版本控制系統的缺點：
1. 操作版本管理系統高度依賴網路，離線時能使用的版本控制功能有限，例如無法查詢每一個歷史版本，也只能跟本機端最新版本進行版本差異比較（diff）。
2. 而分散式版本控制系統因為在本機端存有一份完整的儲存庫，不會因為沒有網路連線而沒辦法進行查詢、版本差異比較等功能。

版本控制的目的在記錄檔案在某一段時間的變更，方便開發者追蹤原始碼，了解系統軟體的歷史變化。如果開發者修正了3個程式臭蟲，就得有3個版本被寫入儲存庫中。使用集中式版本控制系統若沒辦法連到網路，就必須同時修畢3個臭蟲後才能提交，而無法追蹤這3次修改的變化處理。

儘管儲存了整套專案，為了減少佔用的磁碟空間，Git處理資料的方式也與其他版本控制系統的作法不一樣，像CVS或Subversion會記錄檔案隨著時間變更的內容，而Git則只是為當時的**專案資料建立快照（Snapshot）**，如果專案內沒有變更的檔案就不會多儲存一份來佔用磁碟空間，而只是增加了一筆這個檔案的對應連結，開發者開啟新版本存取這個檔案時，還是開啟先前的舊版檔案，而不是開啟內容相同的新副本。

### Git中的檔案有三種狀態
已修改、已暫存和已提交，三者分別位於Working Directory (本地端)、Staging Area (暫存端)和Repository (版本庫)。

![](https://i.imgur.com/61EVQfB.png)

我們在玩遊戲時若沒有存檔、就算關掉遊戲也不會回到歷史狀態；因此我們需要藉由每一次的指令「commit」，也就是遊戲的「存檔」，讓Git知道要在什麼時間點儲存一個版本。

但Git貼心的地方是、為了讓你有反悔的機會，不要commit一個新版本後、才發現沒檢查好錯誤的地方就儲存這個版本，因此又多設了一個「暫存區」稱為「Staging Area」。

可以先將已修改的檔案先用加到「Staging Area」，等確認好檔案一切無誤後、再存入版本庫中。此時就是我們每次的遊戲存檔啦！

### Git的提交流程

1.  修改完但還沒提交的檔案為Modified (玩到一半但還沒存檔的遊戲)
2.  藉由git add指令進入Staging Area暫存起來 (暫存區,但還沒真的確定要存)
3.  最後藉由git commit指令確定將這個檔案版本存入Repository (版本庫,成功存成一個遊戲版本了)。

![Git的提交流程](https://i.imgur.com/L9zFxTQ.png)

4. 若要使用GitHub來和其他人共享專案，開發者則需進一步使用Push指令，將本地端儲存庫的特定版本專案，推到遠端儲存庫上整併。下一次要展開開發工作時，則可先從遠端儲存庫將新版程式碼取回本地端儲存庫（此動作稱為Pull），再從本地端儲存庫放入工作目錄中（此動作稱為Checkout），就可繼續展開下一輪開發。

## 安裝設定 Git

[Github](https://github.com/) 上有[各大平台完整的安裝及設定教學](https://help.github.com/articles/set-up-git)，建議直接參照這個教學來設定就可以了。

其中請特別注意設定好提交者的 name 及 Email，Git 會記錄每個 commit 是由誰提交的，這在版本控制上是很重要的資訊。

我們可以使用以下的指令來進行設定：（`--global</code> 表示是全域設定）`

```
$ git config --global user.name "Fukuball Lin"
$ git config --global user.email "fukuball@gmail.com"
```

設定完成後可以用以下指令來觀察是否有設定完成

```
$ git config --list
user.name=fukuball
user.email=fukuball@gmail.com
```

## 開始使用Git

### 將現有專案CLONE下來

當團隊中有人已開啟了一個在 Git Server 上的 Git Repository，那我們就可以使用 Git clone 來將這個 Repository 抓來自己的 local 端一起進行開發。

#### Clone with HTTPS
首先找到 Git Repository 的位址：
![git path](https://i.imgur.com/x2alsZ4.png)


使用指令`git clone`進行 Clone：

```
$ git clone https://github.com/camellee13/camellee13.github.io.git
```


#### Clone with SSH

特別注意如果有寫入權限的話（被加入成Collaborators），就可以用 SSH 協定 Clone 下來：

```
$ git clone git@github.com:fukuball/Hello-World.git
```

使用 SSH Clone 會比較方便，可以不必每次都輸入帳號密碼，但需要事先綁定 SSH Key，如何[綁定 SSH Key 在 Github 上也有完整的教學](https://help.github.com/articles/connecting-to-github-with-ssh/)。


### Fork

複製（Clone）指令是把專案在遠端儲存庫上的所有內容複製到本地，建立起本機儲存庫及工作目錄，而叉（Fork）則是把別人專案的遠端儲存庫內容複製一份到自己的遠端儲存庫，黃保翕生動的形容：「就像是在餐桌上用叉子把盤子上的一塊肉叉到自己的盤子上。」。

如果在開發者在GitHub上看到有興趣的專案，可以執行Fork指令，把別人專案的遠端儲存庫複製到自己的遠端儲存庫，再執行Clone指令，把自己遠端儲存庫的整個專案的所有內容（包括各版本）複製到本機端儲存庫。



---

### 建立自己的專案

首先打開Git的命令介面，在桌面創建一個叫做project_1的資料夾，並在裡面創建一個名稱為hello.txt的文件。

```
$   cd   ~/desktop$   mkdir project_1
$   cd   ~/desktop/project_1/
$   touch hello.txt
```

#### git init
建立完我們第一個專案後，打上`git init`指令！那在這個資料夾底下下以下指令就可以開啟一個 Git Repository：


```
$   git init
Initialized empty Git repository in   c:/Users/Lynn/desktop/project_1/.git/
Lynn@LYNNCHEN   ~/desktop/project_1   (master)
```

```
$ git init
Initialized empty Git repository in /Users/fukuball/Projects/Hello-World/.git/
```

請注意開啟 Git Repository 之後只是在自己的 local 端開啟了一個版本控制資料庫，雖然可以正常在 local 端進行所有版本控制的功能，但因還未連結至 Git Server，他人並無法加入共同開發。

目前比較紅的 Git Server 服務就是使用 Github 了，Github 上也有[完整的教學](https://help.github.com/articles/create-a-repo)說明如何開 Git Repository，並連結至 Github 上的 Git Server 服務。



成功了之後，我們也會同時看到project_1後面出現master，是什麼意思呢。

一般而言的開發方向有一條主要的開發方向，被稱為「master」，中間可以隨時依功能開發需求、開一條獨立的分支「branch」，等branch方向的功能做到一定程度之後、再「merge」回主幹道上。

![branch](https://hellolynn-2dd1.kxcdn.com/wp-content/uploads/2017/01/git6.jpg)

由於我們還沒有開起任何branch，**Git設定我們目前在的主幹道就是master**。


#### git status

我們可以使用 git status 來觀察 Git Repository 的狀態，比如目前所在的 branch 及 哪些檔案還沒 commit 等等。

```
$ git status
# On branch master
nothing to commit, working directory clean
```


```
$   git status
On branch master
Initial commit
Untracked files:

 (use   "git add ..."   to   include in   what will be committed)

 hello.txt

nothing added to   commit but untracked files present (use "git add" to track)
```

## 進入暫存區(ADD)

### git add (stage)

使用 git add 可以將新增檔案加入 git 版本控制

#### add 單一檔案
```batchfile
$   git add hello.txt
```
#### add所有modified的檔案
直接使用 `git add .` 來將所有剛剛修改過或新增加的檔案一次 Add 進 stage 狀態，大部份人不推薦這樣做，認為太暴力。

```batchfile
$ git add .
```

#### add副檔名相同的檔案
```
$git add '*.txt'
```

## 如果add或commit之後反悔?

> [Reference](http://oomusou.io/git/remove-stage/)

1.  若該檔案不在repository內: git rm –cached 檔案名稱
2.  若檔案已經在repository內: git reset HEAD 檔案名稱

### git rm –cached

先了解`git rm --cached`的背後原理 :

1.  若檔案存在於stage與repository時，會將檔案從repository刪除，並且從stage刪除，但不會刪除working directory的實際檔案，不過由於檔案已經從repository刪除，檔案會從`tracked`變成`untracked`。
2.  若檔案存在於stage，卻不存在於repository，會將檔案從stage刪除，但不會刪除working director的實際檔案，因為repository本來就沒有這個檔案，所以一樣是`untracked`不變。

回想我們的狀況 :

1.  若該檔案**不在**repository內 : `git rm --cached`會幫我們從stage刪除，且檔案本來就是untracked，執行完還是untracked，符合我們的預期。
    
2.  若檔案**已經在**repository內 : `git rm --cached`會幫我們從repository刪除，並且從stage刪除，因為已經從repository刪除檔案，檔案會從`tracked`變成`untracked`，這並不是我們預期的。
    

這解釋了為什麼當檔案**不在**repository時，必須下`git rm --cached`。

---

### git reset HEAD
先了解`git reset HEAD`的背後原理：

HEAD為目前最新的commit節點，`git reset HEAD`表示將檔案還原到目前最新的commit，若沒下任何參數，預設為`--mixed`：

1.  **–soft** : repository的檔案會被還原到HEAD，但stage與working directory檔案不變。
2.  **–mixed** : repository與stage的檔案都會被還原到HEAD，但working directory的檔案不變。
3.  **–hard** : repository、stage與working directory的檔案**都會**被還原到HEAD。

回想我們的狀況：

1.  若該檔案**不在**repository內 : `git reset HEAD`會出現以下錯誤：
    
```
fatal: ambiguous argument 'HEAD': unknown revision or path not in the working tree.

Use '--' to separate paths from revisions, like this:

'git <command> \[<revision>...\] -- \[<file>...\]'  
``` 
>因為檔案根本還沒進repository，也就是還沒有commit過，哪來的HEAD呢？git馬上給你錯誤訊息，，這並不是我們預期的。
    
2.  若檔案**已經在**repository內 : `git reset HEAD`會幫我們將repository與stage還原到目前最新commit節點檔案，但working directory的檔案不會被還原，因為stage的檔案已經不是目前的檔案，所以檔案的狀態由原本的`stage`變成`modified`，符合我們的預期。

這解釋了為什麼當檔案**已經在**repository時，必須下`git reset HEAD`。


## 提交版本(COMMIT)

### git commit (commit)

stage 狀態的檔案的下一步就是準備提交了，一個 commit 在 Git 中就是一個節點，這些 commit 的節點就是未來可以回朔及追蹤的參考。當檔案都加入到 stage 了，那就可以使用以下指令來 commit：

```
$ git commit -m "這次 commit 的適當描述"
```

每個 commit 有個適當的描述是非常重要的，這樣要回朔時會比較容易查找。

```
$   git commit   -m   'Add a line'


\[master   (root-commit)   0dc97a8\]   Add   a   line.

 1   file changed,   0   insertions(+),   0   deletions(-)

 create mode   100644   hello.txt
```

### git commit -e
由於git commit -m僅能輸入一行評論；如果想要比較詳細的評論時，可改為輸入git commit -e就能打開編輯器、撰寫超過一行的評論。

### git commit --amend
**如何修改最後一次的commit呢 ?**

有時候我們 commit 完之後，才發現自己的 commit 內容手殘打錯了，這時候可以使用如下指令，他會跳出編輯視窗給你編輯你上一次的 commit 內容。

```batchfile
git commit --amend
```

又或是我們 commit 完之後，才發現自己漏了幾個檔案沒有 add 進去

這時候可以使用如下指令

```batchfile
git commit -m "init commit"
git add missing_file.py
git commit --amend
```

如上狀況為當我 git commit -m "init commit" 之後，

我發現我漏掉了 **missing_file.py** 這個檔案 (commit 前忘記 add 進去 ) ，

這時候就可以使用 git commit --amend 來修改最後一次的 commit 。


### git commit -a -m (一次完成add和commit)
當還有檔案沒有進 stage 就下 commit 指令，那就不能 commit，這時可使用 git commit -a -m 這樣的暴力法來一次加入檔案至 stage 然後進行 commit，大部份人不建議這麼做。

```
$ git commit -a -m "這次 commit 的適當描述"
```

## History (DIFF, LOG, SHOW)

### git log

我們可以使用 `git log` 的指令查看過去 commit 的紀錄，例如 commit 的版號、作者等等。

```
$   git log

commit   0dc97a8057e1f30139729ce2316f5be966a65ef2
Author:   Lynn19931205
Date:  Wed Sep   7   18:32:32   2016   +0800
 Add   a   line.
```

### git diff

如果我們打開hello.txt、輸入新的一行文字：

![](https://hellolynn-2dd1.kxcdn.com/wp-content/uploads/2017/01/git8.jpg)

再從Git命令列鍵入`git diff`就可以看到修改過後的紀錄。

```batchfile
$   git diff

diff   --git   a/hello.txt   b/hello.txt
index e69de29..1029def   100644

---   a/hello.txt
+++   b/hello.txt
@@   -0,0   +1,2   @@
+print   ('hello world')^M
+print   ('I wanna fly')
\   No newline at end   of file
```


### git show

讓我們來玩玩看`git show`來查看某項特定commit的修改內容：


```batchfile
$   git log

commit   8a85094b22edf4184e7228c3f849807dd7eed2c9
Author:   Lynn19931205
Date:  Wed Sep   7   19:07:21   2016   +0800
 Add new   line   I   wanna fly

commit   0dc97a8057e1f30139729ce2316f5be966a65ef2
Author:   Lynn19931205
Date:  Wed Sep   7   18:32:32   2016   +0800
 Add   a   line.
```

然後我們把上面第一欄的commit代碼複製起來 (複製六碼或以上)後輸入在`git show`後面，就會顯示該次詳細的修改內容：

```batchfile
$   git show   8a8509

commit   8a85094b22edf4184e7228c3f849807dd7eed2c9
Author:   Lynn19931205
Date:  Wed Sep   7   19:07:21   2016   +0800
 Add new   line   I   wanna fly

diff   --git   a/hello.txt   b/hello.txtindex e69de29..1029def   100644---   a/hello.txt+++   b/hello.txt@@   -0,0   +1,2   @@+print   ('hello world')^M+print   ('I wanna fly')\   No newline at end   of file
```


事實上，在git diff後面輸入commit代碼，也可以比較兩次commit間修改的差異：

```batchfile
$   git diff   8a8509   0dc97a

diff   --git   a/hello.txt   b/hello.txt
index   1029def..e69de29   100644
---   a/hello.txt
+++   b/hello.txt
@@   -1,2   +0,0   @@
-print   ('hello world')
-print   ('I wanna fly')

\   No newline at end   of file
```

## 版本控制

Git 中，使用 HEAD 表示目前的版本，

```batchfile
git reset --hard HEAD
```
> **–hard** : repository、stage與working directory的檔案**都會**被還原到HEAD。

[![alt tag](https://camo.githubusercontent.com/8f40da743908064582a69e57f17e460ca4732182/687474703a2f2f692e696d6775722e636f6d2f706b464f38706b2e6a7067)](https://camo.githubusercontent.com/8f40da743908064582a69e57f17e460ca4732182/687474703a2f2f692e696d6775722e636f6d2f706b464f38706b2e6a7067)

如果現在要把目前版本退回到上一個版本，就可以使用 git reset 指令：
上一個版本就是HEAD~1，

```batchfile
git reset --hard HEAD~1
```

[![alt tag](https://camo.githubusercontent.com/d5903d297f8160f514adf5112c1ba69155ce9cc4/687474703a2f2f692e696d6775722e636f6d2f5a54686f6155542e6a7067)](https://camo.githubusercontent.com/d5903d297f8160f514adf5112c1ba69155ce9cc4/687474703a2f2f692e696d6775722e636f6d2f5a54686f6155542e6a7067)

上上一個版本就是HEAD~2，

如果要指定回到某個特定版本：

[![alt tag](https://camo.githubusercontent.com/bbacb4d1ba816104fa7c87a4b351402f1dd704e6/687474703a2f2f692e696d6775722e636f6d2f4b72434f4337312e6a7067)](https://camo.githubusercontent.com/bbacb4d1ba816104fa7c87a4b351402f1dd704e6/687474703a2f2f692e696d6775722e636f6d2f4b72434f4337312e6a7067)

```batchfile
git reset --hard ad41df36b7
```

[![alt tag](https://camo.githubusercontent.com/374b47a22a975b078640667164b543b05348fca9/687474703a2f2f692e696d6775722e636f6d2f3652567574694b2e6a7067)](https://camo.githubusercontent.com/374b47a22a975b078640667164b543b05348fca9/687474703a2f2f692e696d6775722e636f6d2f3652567574694b2e6a7067)

版本號 ( ad41df36b7 ) 沒必要全部都寫，寫前幾位就可以了，Git 會自動去找。

當你退回到某個版本，突然隔天後悔了，想恢復到之前的新版本該怎麼做呢?

找不到新版本的 commit id 該怎麼辦呢?

這時候就可以使用一個指令

```batchfile
git reflog
```

[![alt tag](https://camo.githubusercontent.com/cb810fc0e70f6636ea33f4ccc1e802ff7279cbea/687474703a2f2f692e696d6775722e636f6d2f4d61526c5a5a722e6a7067)](https://camo.githubusercontent.com/cb810fc0e70f6636ea33f4ccc1e802ff7279cbea/687474703a2f2f692e696d6775722e636f6d2f4d61526c5a5a722e6a7067)

接著看你要回到哪個版本，再使用 git reset 即可。

```batchfile
git reset --hard 642e7af
```


## 刪除

### git checkout -- file 可以丟棄工作區的修改

```batchfile
git checkout  -- hello.py
```

命令 git checkout -- hello.py 意思就是，把 hello.py 文件在工作區的修改全部撤銷 ( 丟棄 ) ，

讓這個檔案回到最近一次 git commit 或 git add 時的狀態。

[![alt tag](https://camo.githubusercontent.com/63fbee7527eb66c11c4a154a77b0a8b4226d4e6d/687474703a2f2f692e696d6775722e636f6d2f5372436f346b482e6a7067)](https://camo.githubusercontent.com/63fbee7527eb66c11c4a154a77b0a8b4226d4e6d/687474703a2f2f692e696d6775722e636f6d2f5372436f346b482e6a7067)

當然也可以用 git reset 指令直接回到某個 commit。

```batchfile
git reset --hard xxxxxx
```

```batchfile
git reset --hard 201f40604ec3b6fa8
```

### git rm

有兩種況狀，一種是確定要從版本庫中刪除該檔案，那就用命令 git rm 刪掉，並且 git commit：

```batchfile
rm hello.py
git rm hello.py
git commit -m "remove hello.py"
```

[![alt tag](https://camo.githubusercontent.com/79bb76d60c21031b7dbd6f7c2484c31b3984b656/687474703a2f2f692e696d6775722e636f6d2f734c4d544458372e6a7067)](https://camo.githubusercontent.com/79bb76d60c21031b7dbd6f7c2484c31b3984b656/687474703a2f2f692e696d6775722e636f6d2f734c4d544458372e6a7067)

另一種況狀是刪錯了，使用 git checkout 可以輕鬆還原檔案:

```batchfile
rm hello.py
git checkout -- hello.py
```

[![alt tag](https://camo.githubusercontent.com/f5561eb7efd089c55a1d2390642b3c73a36abc55/687474703a2f2f692e696d6775722e636f6d2f3558324e6366532e6a7067)](https://camo.githubusercontent.com/f5561eb7efd089c55a1d2390642b3c73a36abc55/687474703a2f2f692e696d6775722e636f6d2f3558324e6366532e6a7067)



## 推送程式碼至REMOTE端 (PUSH/PULL)

在Local端寫了這麼久，來試試看將Local端的程式碼推到GitHub網站上吧！

創建repository完畢後，我們會進到這個頁面：

![](https://hellolynn-2dd1.kxcdn.com/wp-content/uploads/2017/01/3.jpg)

### git remote add origin https://github.com/try-git/try_git.git
To push our local _repo_ to the GitHub server we'll need to add a remote repository.


### git push

當已經連結了 Git Server，就可以用 git push 來將 local 端的 commit 更新到 Server 上，請注意有修改的檔案還沒 commit 那就無法使用 git push，所以一定要將所有更新都 commit 之後，才有辦法使用 git push。

```
$ git push
```

The name of our remote is `origin` and the default local branch name is `master`. The `-u` tells Git to remember the parameters, so that next time we can simply run `git push` and Git will know what to do.

```
$ git push -u origin master
```


### git pull

當已經連結了 Git Server，我們就可以使用 git pull 來將遠端更新的 code 抓回來，同樣如果 local 端有任何更新，一定都要 commit 之後才  
有辦法使用 git pull。

```
$ git pull
```

```
$ git pull origin master
```

### git fetch


可以先簡單想成 **git pull = git fetch + git merge**
我們先來看下面這張圖， **git fetch + git merge**
> git merge 請參閱合併分支

[![alt tag](https://camo.githubusercontent.com/912f5081aa2dbf177d1d348fde25839e4dcaef26/687474703a2f2f692e696d6775722e636f6d2f434f75574279772e706e67)](https://camo.githubusercontent.com/912f5081aa2dbf177d1d348fde25839e4dcaef26/687474703a2f2f692e696d6775722e636f6d2f434f75574279772e706e67)

再看這張圖 **git pull**

[![alt tag](https://camo.githubusercontent.com/6145542f51f8d475175cab903975ca70743ae13e/687474703a2f2f692e696d6775722e636f6d2f384647754137352e706e67)](https://camo.githubusercontent.com/6145542f51f8d475175cab903975ca70743ae13e/687474703a2f2f692e696d6775722e636f6d2f384647754137352e706e67)

這樣是不是清楚多了!!!


---

### 同時修改Remote端和Local端的檔案
若我們同時修改Remote端和Local端的檔案、改到同一行程式碼的時候該怎麼辦? 多說無益，直接來試試看吧!

將hello.txt檔案打開，在Remote端的第三行加入一排的驚嘆號「!!!!!!」、再打開Local端加入一排的問號「?????」。

![](https://hellolynn-2dd1.kxcdn.com/wp-content/uploads/2017/01/4.jpg)

接下來一樣透過和git commit -m，將Local端的程式碼送進Repository。有趣的來了，當我們將輸入 git pull 將程式碼從Remote端拉下來到Local端這邊時：


```
$ git pull

remote:   Counting objects:   3,   done.

remote:   Compressing objects:   100%   (2/2),   done.

remote:   Total   3   (delta   0),   reused   0   (delta   0),   pack-reused   0

Unpacking objects:   100%   (3/3),   done.

From https://github.com/Lynn19931205/project_1

  260b7de..957b721 master -> origin/master

Auto-merging hello.txt

CONFLICT (content): Merge conflict in hello.txt

Automatic merge failed; fix conflicts and   then commit the result.
```


咦發生什麼事了? 看到最後一行了嗎，Git表示：安安你們有一些衝突(conflicts)，待解決完我才會幫你們成功把Remote端的東西融合到Local端這邊噢。先來打開Local端的hello.txt檔案：

![](https://hellolynn-2dd1.kxcdn.com/wp-content/uploads/2017/01/5.jpg)

咦?! Git很體貼地將程式碼衝突的地方標起來、兩款程式碼都放上去，讓開發者決定要留哪一個版本、或是直接開發出第三個版本。

經過一番掙扎之後… 我們下了個艱難的抉擇──留下問號「?????」，並把其他程式碼都刪除乾淨。

![](https://hellolynn-2dd1.kxcdn.com/wp-content/uploads/2017/01/7.jpg)

最後再一次git commit、git add，最後用git push將目前這個版本「推送」到Remote端(一樣須輸入GitHub帳號密碼)。

**這時回到GitHub網站重新整理，可以發現…Remote端的程式碼從驚嘆號變成最新修改完成的問號了！**

![git04.jpg](https://hellolynn-2dd1.kxcdn.com/wp-content/uploads/2017/04/git04.jpg)

---

### .gitigore

log 檔及 build 出來的檔案及系統產生的檔案如 .DS_Store 等等，我們並不需要 commit 上去 Repository，所以我們會在 Repository 編寫一個 .gitignore 文字檔來忽略這些檔案。

範例 .gitigore 如下：

```
.DS_Store
*.log
```

## 使用 Git 一次 Push 到多個不同的遠端 ( remote )
先使用下方指令查看

```batchfile
git remote -v
```

[![alt tag](https://camo.githubusercontent.com/24fe1cc26253662d94cd99abcd646c88ac34aac8/687474703a2f2f692e696d6775722e636f6d2f51623556486f502e706e67)](https://camo.githubusercontent.com/24fe1cc26253662d94cd99abcd646c88ac34aac8/687474703a2f2f692e696d6775722e636f6d2f51623556486f502e706e67)

接著我們使用下列指令新增一個 origin 的遠端

```batchfile
git remote set-url --add origin <url>
```

```batchfile
git remote set-url --add origin git@github.com:twtrubiks/test2.git
```

[![alt tag](https://camo.githubusercontent.com/254e59fc1913ac4086eedb083c917af053f3f0eb/687474703a2f2f692e696d6775722e636f6d2f464b7a657856452e706e67)](https://camo.githubusercontent.com/254e59fc1913ac4086eedb083c917af053f3f0eb/687474703a2f2f692e696d6775722e636f6d2f464b7a657856452e706e67)

我們再用 git remote -v 查看一次，你會發現多了剛剛新增的遠端 ( remote )

[![alt tag](https://camo.githubusercontent.com/efd8ab580f8d9e4fb9bef4903145f9ed9a654a22/687474703a2f2f692e696d6775722e636f6d2f703171374334622e706e67)](https://camo.githubusercontent.com/efd8ab580f8d9e4fb9bef4903145f9ed9a654a22/687474703a2f2f692e696d6775722e636f6d2f703171374334622e706e67)

最後我們再 push

[![alt tag](https://camo.githubusercontent.com/6365be8d782eacba6519e434cd99baf3d81e6619/687474703a2f2f692e696d6775722e636f6d2f36564b6838427a2e706e67)](https://camo.githubusercontent.com/6365be8d782eacba6519e434cd99baf3d81e6619/687474703a2f2f692e696d6775722e636f6d2f36564b6838427a2e706e67)

仔細看，是不是一次 push 到多個不同的遠端 ( remote )，非常方便!!

## Git 更換遠端伺服器倉庫網址URL

1. 確認目前Git遠端伺服器網址： git remote -v

```
git remote -v
origin  https://github.com/USERNAME/REPOSITORY.git (fetch)
origin  https://github.com/USERNAME/REPOSITORY.git (push)
```

2. 更換Git遠端伺服器位網址，使用：git remote set-url

```
git remote set-url origin https://github.com/USERNAME/OTHERREPOSITORY.git
```

3. 再次確認Git遠端伺服器網址

```
git remote -v
origin  https://github.com/USERNAME/OTHERREPOSITORY.git (fetch)
origin  https://github.com/USERNAME/OTHERREPOSITORY.git (push)
```

如果是使用SSH的存取網址，指令一樣是使用git remote set-url，再接上新的SSH URL就可以更換，指令如下：

```
git remote set-url origin git@github.com:USERNAME/OTHERREPOSITORY.git
```

不管是要HTTP/HTTPS跟SSH，二種存取網址都是可以直接做更換，然後下次git push/ git fetch 就會到新設定的網址去了唷。


## 使用分支
Git作為分散式版本管理系統的好處是不需仰賴中央單一一條主幹道開發，可根據開發需求、隨時在某一時間點開分支(branch)獨立開發某一項功能，待開發完成後再融合(merge)回去主幹道。

![](https://hellolynn-2dd1.kxcdn.com/wp-content/uploads/2017/01/git6.jpg)

主幹(master)與分支(branch)是稱呼專案的主要版本和分支版本。在Git第一個建立的專案版本會被稱為master版本。

然而實際上master也僅是其中一條branch，所有branch間的關係都是平等的、彼此間無主從關係。一般習慣將穩定版本稱主幹，其餘的變動、開發中版本則都稱作分支。


### git branch：開分支
開branch的方式非常簡單，直接輸入`git branch` 即可。

```
$   git branch branch_a
```

不過這代表著什麼意思呢? 請看下圖：

![](https://hellolynn-2dd1.kxcdn.com/wp-content/uploads/2017/01/8.jpg)

### git branch：查看目前分支
```
$ git branch
* master
```

### git branch -a：查看所有分支
輸入git branch -a可以查看目前我們開的所有branch：
```
$   git branch   -a 
branch_a
master  remotes/origin/master
```

### git branch -r：查看遠端分支
如果是第一次使用 git clone ，你會發現你只有 master 分支 ，這時候我們先查看遠端還有什麼分支

```batchfile
git branch -r
```


## 切換分支或commit

### git checkout

假設目前master幹道上有五個commit的版本；若沒有指定要回溯至哪一個歷史版本，branch就會採用最新一次commit的版本。 但若我們想切到某一個commit版本開一條branch時，該怎麼做呢?

![branch.jpg](https://hellolynn-2dd1.kxcdn.com/wp-content/uploads/2017/04/branch.jpg)

我們可以先輸入git log查看所有commit的歷史紀錄：

```batchfile
$   git log

commit   372466ead9e54fd3a464cb85d78cd5304f335bc4 Merge:   6183031   957b721 
Author:   Lynn19931205  
Date:   Wed Sep   7   23:35:26   2016   +0800 
Final   Edit  

commit   957b721541d834fb7a71157f0401bdd013ea6e08
Author:   Lynn
Date:   Wed Sep   7   23:23:16   2016   +0800 
Update hello.txt

commit adb3238e29668c95130c1e6e82b5bab3faef5489
Author:   Lynn19931205
Date:   Wed Sep   7   20:30:07   2016   +0800 
Add   a   if   statement

commit   8a85094b22edf4184e7228c3f849807dd7eed2c9
Author:   Lynn19931205
Date:   Wed Sep   7   19:07:21   2016   +0800 
Add new   line   I   wanna fly

commit   0dc97a8057e1f30139729ce2316f5be966a65ef2
Author:   Lynn19931205
Date:   Wed Sep   7   18:32:32   2016   +0800 
Add   a   line.
```


就決定回到第三個commit的版本好了! 選好回溯的時間點後，發動時光機`git checkout`的威力(checkout後面輸入commit代碼至少6碼)；待checkout過去之後，就可以開一條branch了：

```
$ git checkout adb3238

$ git branch branch_a
```

但這邊我們只是先建立了一個branch噢，實際上我們人還待在master這條幹道上。

因此我們必須利用checkout的另外一個功能、也就是切換各條branch的功能! (別忘了master也只是其中一條branch)。輸入`git checkout`：

```
$   git checkout branch_a

Switched to   branch   'branch_a'
```

這時候可以發現，我們的所在位置已經從master切換到branch_a這條分支了!

```
Lynn@LYNNCHEN   ~/desktop/project_1   (master) 

Lynn@LYNNCHEN   ~/desktop/project_1   (branch_a)
```

### git checkout -b

首先創建一個分支，bug1 分支 ( 名稱可以隨便取 )，然後切換到 bug1 分支：

```batchfile
git branch bug1
git checkout bug1
```
git branch bug1 為創造一個名稱為 bug1 的分支，
git checkout bug1 為切換到一個名稱為 bug1 的分支底下。

[![alt tag](https://camo.githubusercontent.com/0ae4bc7c780b877a8b1050efe52d1e4fa8fdc2c2/687474703a2f2f692e696d6775722e636f6d2f4a744742486b342e6a7067)](https://camo.githubusercontent.com/0ae4bc7c780b877a8b1050efe52d1e4fa8fdc2c2/687474703a2f2f692e696d6775722e636f6d2f4a744742486b342e6a7067)

以上兩行指令，相當於下列一行指令

```batchfile
git checkout -b bug1
```




## 刪除分支

既然issue1分支的內容已經順利地合併到master分支了，現在我們可以將其刪除。

欲刪除分支，請執行`branch -d` 命令。

```
git branch -d <branch>
```

執行以下的命令以刪除 issue1 分支，。

```
$ git branch -d issue1
Deleted branch issue1 (was b2b23c4).
```
issue1分支被刪除了。您可以用`git branch`命令來確認分支是否已被刪除。

```
$ git branch
\* master
```

## 合併分支
### git merge

在branch開發了一段時間後，終於完成想要的功能了! 此時可以把branch再融合回去主要的開發幹道上。

首先必須利用checkout回到想要merge過去的主幹道上；比如在此例中我們用git checkout回到master線上之後，再輸入要merge過去的branch名稱`git merge`。

```
$   git checkout master

Switched to   branch   'master' 

$   git merge branch_a
```

由於我們說過master也只是一條branch、和所有branch彼此關係平等，因此要checkout到branch_a、再merge master過來也是可行的，端看開發者需求。

若顯示merge failed時，可能發生了主幹道和分支有同一行程式碼的衝突。

此時就和我們在介紹push/pull時遇到Local端和Remote端程式碼衝突的情形相同，Git會告訴我們哪些地方彼此merge有衝突，待開發者一一解決後再重新merge一次即可成功。





## git revert


假設我 commit history 為 A1 -> A2 -> A3 -> A4 -> A5 -> A6

我現在想要回 A4 這個 commit , 這時候我就可以使用 git revert ！！

先 revert A6

```batchfile
git revert A6
```

再 revert A5

```batchfile
git revert A5
```

假如你再看現在的 commit history , 他會長的像這樣

A1 -> A2 -> A3 -> A4 -> A5 -> A6 -> A6\_revert -> A5\_revert

這時候，其實你的 commit 就是在 A4 這個位置 。

使用 git revert 的好處，就是可以保留 commit history , 萬一你又後悔了，

也可以在 revert 回去。

## git stash 指令

很多時候，我們正在開發一個新功能又或是 debug，然後突然有一個功能需要緊急修正，

但你又不想 commit 現在的狀況，因為根本沒意義，事情只做了一半，這時候 **stash**

這個實用的指令就派上用場了。

舉個例子，假設我們改了 A.py 和 B.py 這兩個檔案

[![alt tag](https://camo.githubusercontent.com/948ccec00d46a6e8e9da7a953f19f5ed692f13d2/687474703a2f2f692e696d6775722e636f6d2f377858305431542e6a7067)](https://camo.githubusercontent.com/948ccec00d46a6e8e9da7a953f19f5ed692f13d2/687474703a2f2f692e696d6775722e636f6d2f377858305431542e6a7067)

然後，現在突然有一個bug必須馬上 ( 立刻 ) 處理，但是，啊我手上的事情還沒做完阿~~~~ 這時候，可以利用以下指令

```batchfile
git stash
```

[![alt tag](https://camo.githubusercontent.com/aba05cdce8ae9d8a3aff22e6ac8008119bbc2d0d/687474703a2f2f692e696d6775722e636f6d2f63594348386d562e6a7067)](https://camo.githubusercontent.com/aba05cdce8ae9d8a3aff22e6ac8008119bbc2d0d/687474703a2f2f692e696d6775722e636f6d2f63594348386d562e6a7067)

假如你想要更清楚自己這次的 stash 原因是什麼，或是這是正在開發什麼功能 可以使用以下指令

```batchfile
git stash save -u "我是註解"
```

```batchfile
git stash save -u "feature"
```

[![alt tag](https://camo.githubusercontent.com/6ebdd537501e31efc9bdf91cf8de3b16c9f90cc4/687474703a2f2f692e696d6775722e636f6d2f6e4753313150782e6a7067)](https://camo.githubusercontent.com/6ebdd537501e31efc9bdf91cf8de3b16c9f90cc4/687474703a2f2f692e696d6775722e636f6d2f6e4753313150782e6a7067)

接下來你可以使用 status 指令，你會發現變乾淨了

[![alt tag](https://camo.githubusercontent.com/6f70a049bad0028ab70cd101d43b35edb6295ebe/687474703a2f2f692e696d6775722e636f6d2f5866353347664d2e6a7067)](https://camo.githubusercontent.com/6f70a049bad0028ab70cd101d43b35edb6295ebe/687474703a2f2f692e696d6775722e636f6d2f5866353347664d2e6a7067)

並且可以使用下列的指令來觀看 stash 裡面的東西

```batchfile
git stash list
```

[![alt tag](https://camo.githubusercontent.com/30d0e05f5d957050c017bcd0bb6dca943c432664/687474703a2f2f692e696d6775722e636f6d2f6a5150695969582e6a7067)](https://camo.githubusercontent.com/30d0e05f5d957050c017bcd0bb6dca943c432664/687474703a2f2f692e696d6775722e636f6d2f6a5150695969582e6a7067)

然後你很努力地解決這個 bug，commit 完之後， 可以再使用下列的指令把 stash 取回來，這指令取回後也會刪除 stash

```batchfile
git stash pop
```

假設今天你有很多的 stash，你可以指定，如下

```batchfile
git stash pop stash@{0}
```

[![alt tag](https://camo.githubusercontent.com/c332b544ad88de6c96d28ad16b60b8962931c004/687474703a2f2f692e696d6775722e636f6d2f7a5646376e6f322e6a7067)](https://camo.githubusercontent.com/c332b544ad88de6c96d28ad16b60b8962931c004/687474703a2f2f692e696d6775722e636f6d2f7a5646376e6f322e6a7067)

你會發現剛剛的東西回來了~

如果你希望使用 stash 取回之後，不希望刪除 stash ，可以使用下列的指令

```batchfile
git stash apply
```

如下圖，你可以發現取回後， stash 並沒有被刪除

[![alt tag](https://camo.githubusercontent.com/0127b90b0eb18d177f2ad65ad9c60d533808824c/687474703a2f2f692e696d6775722e636f6d2f773349703369572e6a7067)](https://camo.githubusercontent.com/0127b90b0eb18d177f2ad65ad9c60d533808824c/687474703a2f2f692e696d6775722e636f6d2f773349703369572e6a7067)

如果你只是想要刪除暫存，可以使用下列的指令

```batchfile
git stash clear
```

從下圖可以發現，stash 裡面的東西被我們刪除了

[![alt tag](https://camo.githubusercontent.com/b90ba1b7e995c7e72d79fe8f8aa44bacd8e0752e/687474703a2f2f692e696d6775722e636f6d2f50767a756662512e6a7067)](https://camo.githubusercontent.com/b90ba1b7e995c7e72d79fe8f8aa44bacd8e0752e/687474703a2f2f692e696d6775722e636f6d2f50767a756662512e6a7067)

如果你想丟棄指定的 stash，可以使用

```batchfile
git stash drop stash@{0}
```