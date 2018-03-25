# How to use Git

Reference:
[Git 簡易使用教學](https://coderwall.com/p/yl1-ug/git--2)
[連猴子都能懂的Git入門指南](https://backlog.com/git-tutorial/tw/intro/intro1_1.html)


## 前言

版本控制一直是軟體開發中非常重要的工具，而 Git 與 Subversion、CVS 不同的地方在於 Subversion 及 CVS 是屬於 Centralized VCS，Centralized VCS 的共同缺點是做什麼事都要跟伺服器連線，這樣開發會比較慢，且只要伺服器壞掉，就無法工作了。

Git 則屬於分散式版本控制系統，讓本地端也維護完整的 Repository，即使沒網路，照常可以 commit 和看 history log，伺服器的 Repository 可以在將來有網路連線時再同步更新。

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

## Git 指令的簡易使用教學

### git init

當 Git 安裝設定好之後，就可以開始使用 Git 版本控制了，假設現在你有一個 Hello-World 的資料夾，那在這個資料夾底下下以下指令就可以開啟一個 Git Repository：

```
$ git init
Initialized empty Git repository in /Users/fukuball/Projects/Hello-World/.git/
```

請注意開啟 Git Repository 之後只是在自己的 local 端開啟了一個版本控制資料庫，雖然可以正常在 local 端進行所有版本控制的功能，但因還未連結至 Git Server，他人並無法加入共同開發。

目前比較紅的 Git Server 服務就是使用 Github 了，Github 上也有[完整的教學](https://help.github.com/articles/create-a-repo)說明如何開 Git Repository，並連結至 Github 上的 Git Server 服務。

### git clone

當團隊中有人已開啟了一個在 Git Server 上的 Git Repository，那我們就可以使用 Git clone 來將這個 Repository 抓來自己的 local 端一起進行開發。

首先找到 Git Repository 的位址：

  
![git path](http://static.obeobe.com/image/blog-image/git-1.png)  
</p>

使用以下指令進行 Clone：

```
$ git clone https://github.com/fukuball/Hello-World.git
```

特別注意如果有寫入權限的話（被加入成Collaborators），就可以用 SSH 協定 Clone 下來：

```
$ git clone git@github.com:fukuball/Hello-World.git
```

使用 SSH Clone 會比較方便，可以不必每次都輸入帳號密碼，但需要事先綁定 SSH Key，如何[綁定 SSH Key 在 Github 上也有完整的教學](https://help.github.com/articles/generating-ssh-keys)。

### git status

我們可以使用 git status 來觀察 Git Repository 的狀態，比如目前所在的 branch 及 哪些檔案還沒 commit 等等。

```
$ git status
# On branch master
nothing to commit, working directory clean
```

### git add (stage)

使用 git add 可以將新增檔案加入 git 版本控制，但我通常就直接使用 git add . 來將所有剛剛修改過或新增加的檔案一次 Add 進 stage 狀態，大部份人不推薦這樣做，認為太暴力，但既然都有版本控制系統了，我個人習慣就不這麼婆婆媽媽的了。

```
$ git add .
```

### git commit (commit)

stage 狀態的檔案的下一步就是準備提交了，一個 commit 在 Git 中就是一個節點，這些 commit 的節點就是未來可以回朔及追蹤的參考。當檔案都加入到 stage 了，那就可以使用以下指令來 commit：

```
$ git commit -m "這次 commit 的適當描述"
```

每個 commit 有個適當的描述是非常重要的，這樣要回朔時會比較容易查找。

當還有檔案沒有進 stage 就下 commit 指令，那就不能 commit，這時可使用 git commit -a -m 這樣的暴力法來一次加入檔案至 stage 然後進行 commit，大部份人不建議這麼做，但我個人習慣不這麼婆婆媽媽。

```
$ git commit -a -m "這次 commit 的適當描述"
```

### git push

當已經連結了 Git Server，就可以用 git push 來將 local 端的 commit 更新到 Server 上，請注意有修改的檔案還沒 commit 那就無法使用 git push，所以一定要將所有更新都 commit 之後，才有辦法使用 git push。

```
$ git push
```

### git pull

當已經連結了 Git Server，我們就可以使用 git pull 來將遠端更新的 code 抓回來，同樣如果 local 端有任何更新，一定都要 commit 之後才  
有辦法使用 git pull。

```
$ git pull
```

### git log

我們可以使用 git log 的指令查看過去 commit 的紀錄，例如 commit 的版號、作者等等。

```
$ git log
```

### .gitigore

log 檔及 build 出來的檔案及系統產生的檔案如 .DS_Store 等等，我們並不需要 commit 上去 Repository，所以我們會在 Repository 編寫一個 .gitignore 文字檔來忽略這些檔案。

範例 .gitigore 如下：

```
.DS_Store
*.log
```

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

### 刪除分支

既然issue1分支的內容已經順利地合併到master分支了，現在我們可以將其刪除。

欲刪除分支，請執行`branch -d` 命令。

```
git branch -d <branch>
```

執行以下的命令以刪除 issue1 分支，。

```
git branch -d issue1**
Deleted branch issue1 (was b2b23c4).
```
issue1分支被刪除了。您可以用`git branch`命令來確認分支是否已被刪除。

```
$ **git branch**
\* master
```
